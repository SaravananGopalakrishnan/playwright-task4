import user from '../testData/user.json'
import adminSearch from '../testData/adminSearch.json'
import { UserTestData } from '../interface/UserData'
import { adminSearchData } from '../interface/adminSearchData'

export class TestData {
   static getUser():UserTestData{
     return user as UserTestData
   }

   static getAdminUser():adminSearchData{
    return adminSearch as adminSearchData
   }
}