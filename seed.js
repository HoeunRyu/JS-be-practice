import mongoose from "mongoose";
import userData from "./seedData/userData.js";
import missionData from "./seedData/missionData.js";
import User from "./models/User.js";
import Mission from "./models/Mssion.js";
import { DATABASE_URL } from "./env.js";

mongoose.connect(DATABASE_URL);

//1. env.js파일 DATABASE_URL에서 database 이름 practice로 설정
//2. models폴더 아래 User.js와 Mission.js파일에서 각각 users와 missions 스키마 정의하고 collection 생성
//3. 초기 seed데이터(usrData, missionData) 넣어주기
await User.deleteMany({});
await User.insertMany(userData);

await Mission.deleteMany({});
await Mission.insertMany(missionData);

mongoose.connection.close();
