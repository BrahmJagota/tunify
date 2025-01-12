import {prop, getModelForClass, Ref} from '@typegoose/typegoose';
class User {
    @prop({required: true, type: () =>  String})
    public username!: string;
    
    @prop({required: true, unique: true, type: () =>  String})
    public email!: string;

    @prop({required: false, type: () =>  String})
    public password!: string

    @prop({required: false, type: () => String})
    public refreshToken!: string

    @prop({required: true, enum: ["self", "google"], default: "self", type: () => String})    
    public authSource!: "self" | "google";

    @prop({required: true, enum: ["ADMIN", "USER"], default: "USER", type: () => String})    
    public role!: "ADMIN" | "USER";

   
}

class Music {
    @prop({required: true, type: () =>  String})
    public title!: string;
    
    @prop({required: true, type: () =>  String})
    public musicKey!: string;

    @prop({required: true, type: () =>  String})
    public thumbnailKey!: string;

    @prop({required: true, type: () =>  Number})
    public amount!: number;

    @prop({ required: true, ref: () => User })
    public userId!: Ref<User>;

    // @prop({required: true, enum: ["ADMIN", "USER"], default: "ADMIN", type: () => String})    
    // public uploadedBy!: "ADMIN" | "USER";
    
}

class Purchased {
    @prop({ required: true, type: () => String })
    public musicId!: Ref<Music>;

    @prop({ required: true, type: () => String })
    public userId!: string;

    @prop({required: true, enum: ["successful", "failed"], type: () =>  String})
    public payment!: "successful" | "failed";
}

export const userModel = getModelForClass(User);
export const musicModel = getModelForClass(Music);
export const purchasedModel = getModelForClass(Purchased);