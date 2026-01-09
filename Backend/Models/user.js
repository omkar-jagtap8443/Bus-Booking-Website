import mongooose from 'mongooose';
const UserSchema = new mongooose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true ,unique:true },
    password: { type: String, required: true },
    role:{
        type:[String],
        enum:['user','driver']

    }

});

const User = mongooose.model('User', UserSchema)

export default User;

