import mongoose from "mongoose";

//다룰 객체의 틀을 정의
const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please fill a valid email address",
      ],
    },
    nickname: {
      type: String,
      required: true,
      unique: true,
    },
    userMsg: {
      type: String,
    },
    devLevel: { type: Number, default: 1 },
    currentPoint: { type: Number, default: 0 },
    totalPoint: { type: Number, default: 100 },
    answerCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    createdAt: {
      type: String,
      default: Date.now,
    },
    updatedAt: {
      type: String,
      default: Date.now,
    },
  },
  { timestamps: true }
);

//스키마를 기반으로 객체 생성, 조회, 수정, 삭제 인터페이스 생성해주기
const User = mongoose.model("User", UserSchema);
export default User;
