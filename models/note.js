// const url =
//   `mongodb+srv://user_mordy:7894561230@cluster0.ut7cg.mongodb.net/note-app?retryWrites=true`
require('dotenv').config('./env')
const mongoose = require('mongoose')
const url = process.env.MONGODB_URL;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result=>{
    console.log(`conneting success`);
  })
  .catch(
    error=>{
      console.log(`error connecting to MongoDB`,error.message);
  });
  
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})
noteSchema.set('toJSON',
  {
    transform:(document,returnOBJ)=>{
      returnOBJ.id = returnOBJ._id.toString();
      delete returnOBJ._id;
      delete returnOBJ.__v;
    }
  }
)
// noteSchema.set('toJSON',{
//   transform:(document,returnedObject)=>{
//     returnObject.id = returnObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   }
// })\

// noteSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

module.exports = mongoose.model(`Note`,noteSchema)