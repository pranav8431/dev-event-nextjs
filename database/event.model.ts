import {Schema , model , models , Document} from 'mongoose';

export interface IEvent extends Document{
    title : string;
    slug : string;
    description : string;
    overview : string;
    image : string;
    venue : string;
    location : string;
    date : string;
    time : string;
    mode : string;
    audience : string;
    agenda : string[];
    organizer : string;
    tags : string[];
    createdAt : Date;
    updatedAt : Date;
}


const EventSchema = new Schema<IEvent>({
    title:{
        type : String,
        required : [true , "Event title is required"],
        trim : true,
        maxlength : [150 , "Event title can't exceed 150 characters"],
    },
    slug : {
        type : String,
        unique : true,
        lowercase : true,
        trim : true,
    },
    description : {
        type : String,
        required : [true , "Description is required"],
        trim : true,
        maxlength : [500 ,  "Description can't exceed 500 characters"],
    },
    overview : {
        type : String,
        required : [true  , 'Overview is required'],
        trim : true,
        maxlength : [500 , 'Overview cannot exceed 500 characters'],
    },
    image: {
        type : String,
        required : [true , "Image url is required"],
        trim : true,
    },
    venue: {
        type : String ,
        required : [true , "Venue is required"],
        trim : true,
    },
    location : {
        type : String,
        required : [true , "location is required"],
        trim : true,
    },
    date : {
        type : String,
        required : [true , "Date is required"],
    },
    time : {
        type : String,
        required: [true , "Time is required"],
    },
    mode: {
        type : String,
        required: [true , "Mode is required"],
        enum :{
            values: ['online' , 'offline' , 'hybrid'],
            message: "Mode must be either online , offline or hybrid",
        },
    },
    audience :{
        type : String,
        required: [true , "Audience is required"],
        trim : true,
    },
    agenda :{
        type : [String],
        required : [true ,  "Agenda is required"],
        validate :{
            validator : (s : String[])=> s.length > 0,
            message : "Agenda must have at least one item",
        }
    },
    organizer : {
        type : String,
        required : [true , "organizer is required"],
        trim : true,
    },
    tags :{
        type : [String],
        required : [true , "Tags are required"],
        validate:{
            validator : (v : string[]) => v.length > 0,
            message : "There must be at least one tag",
        },
    },

},
{
    timestamps : true, // automatically adds createdAt and updatedAt fields
}
);



EventSchema.pre('save' , function(next){
    const event = this as IEvent;
    //generate slug if title is modified or the event is new
    if(event.isModified('title')){
        event.slug = generateSlug(event.title);
    }
    if(event.isModified('date')){
        event.date = normalizeDate(event.date);
    }
    if(event.isModified('time')){
        event.time = normalizeTime(event.time);
    }
    next();
});


function generateSlug(title: string) : string{
    title = title.toLowerCase()
    title = title.replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    title = title.replace(/\s+/g, '-') // Replace spaces with hyphens
    title = title.replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    title = title.replace(/^-|-$/g, '');
    return title;
}

function normalizeDate(dateString: string): string{
    const date = new Date(dateString);
    if(isNaN(date.getTime())){
        throw new Error("Invalid date format");
    }
    return date.toISOString().split('T')[0]; // Return date in YYYY-MM-DD format
}
// Helper function to normalize time format
function normalizeTime(timeString: string): string {
  // Handle various time formats and convert to HH:MM (24-hour format)
  const timeRegex = /^(\d{1,2}):(\d{2})(\s*(AM|PM))?$/i;
  const match = timeString.trim().match(timeRegex);
  
  if (!match) {
    throw new Error('Invalid time format. Use HH:MM or HH:MM AM/PM');
  }
  
  let hours = parseInt(match[1]);
  const minutes = match[2];
  const period = match[4]?.toUpperCase();
  
  if (period) {
    // Convert 12-hour to 24-hour format
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
  }
  
  if (hours < 0 || hours > 23 || parseInt(minutes) < 0 || parseInt(minutes) > 59) {
    throw new Error('Invalid time values');
  }
  
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
}

// Create unique index on slug for better performance
EventSchema.index({ slug: 1 }, { unique: true });

// Create compound index for common queries
EventSchema.index({ date: 1, mode: 1 });

const Event = models.Event || model<IEvent>('Event', EventSchema);

export default Event;