import{Schema , model ,models, Document , Types} from 'mongoose';
import Event from './event.model';

export interface IBooking extends Document{
    eventId : Types.ObjectId;
    email : string;
    createdAt: Date;
    updateAt : Date;
}

const BookingSchema = new Schema<IBooking>(
    {
        eventId : {
            type : Schema.Types.ObjectId,
            ref: 'Event',
            required : [true , 'Event Id is required'],
        },
        email : {
            type : String,
            required : [true , "Email is required"],
            trim : true,
            lowercase : true,
            validate : {
                validator : function(email : string){
                    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                    return emailRegex.test(email);
                },
                message : 'Please provide a valid email address',
            },
        },
    },
    {
        timestamps : true,
    }
);



BookingSchema.pre('save' , async function(next){
    const booking = this as IBooking;
    if(booking.isModified('eventId') || booking.isNew){
        try{
            const eventExists = await Event.findById(booking.eventId).select('__id');
            if(!eventExists){
                const error = new Error(`event with Id ${booking.eventId} does not exist`);
                error.name = 'ValidationError';
                return next(error);
            }
        }catch{
            const validationError = new Error('Invalid events Id format or database error');
            validationError.name = 'ValidationError';
            return next(validationError);
        }
    }
    next()
});

BookingSchema.index({ eventId: 1 });

// Create compound index for common queries (events bookings by date)
BookingSchema.index({ eventId: 1, createdAt: -1 });

// Create index on email for user booking lookups
BookingSchema.index({ email: 1 });

// Enforce one booking per events per email
BookingSchema.index({ eventId: 1, email: 1 }, { unique: true, name: 'uniq_event_email' });
const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;