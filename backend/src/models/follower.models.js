import mongoose  from "mongoose";

const followerSchema = mongoose.Schema({
    follower:{     // the one who is following the artist
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    artist:{ // the one who is being followed by the follower 
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export const Follower = mongoose.model("Follower",followerSchema);

// Discussion on the follower model
// We have all the required information about the user/artist but we dont have info about the no of followers the artist and no of artist
// the user is following.

// Also a follow button exists that marks whether you are following the artists or not.

/*
follower - ankit, aparna , aparankit
Artist - guru ,yoyo, emiway

In reality both are users only 

How docs gets created 
Whenver you are following a artist a new document is created 
A artist can be followed by multiple followers , a follower can follow multiple artists
    art: yoyo        art:guru          art:emiway
    follower:ankit   follower:aparna   follower:ankit

                    art:guru                        art:yoyo
                    follower:aparankit              follower:aparankit
   
  Now how to find the no of followers of an artist say yoyo?
  Go to follower collections and select those docs jisme artist is yoyo here 2 subscribers , ankit and aparankit

  How to find the no of artists followed by the follower say aparankit
  Go to followers collection and select those docs jisme followe is aparankit here aparankit is following two artists yoyo and guru



We have to perform joing of the follower model  with the user model ie left join , follower se jitni information milte hai join with the user


 ------------------------------------------------------------------------------------------------------------------------------ 

    

*/

