

var a=require("readline-sync")
var fs=require('fs')
const axios=require('axios')
const link="https://api.merakilearn.org/courses"
axios.get(link)

.then(responce=>{
     var data=responce.data
     var myfile=JSON.stringify(data,null,4);
     fs.writeFileSync("nav.json",myfile)
     console.log(myfile)
     
     var array=[]
     var serial_no=0
     for(i of data){
          console.log(serial_no+1,":",i["name"],i["id"])
          array.push(i["name"],i["id"])
          serial_no++
     }

     user_input=a.question("enter your cours number:")-1
     console.log(data[user_input]["name"])
     id=data[user_input]["id"]

     var link2="https://api.merakilearn.org/courses/"+id+"/exercises"
     axios.get(link2)
     .then(responce1=>{
          var newdata=responce1.data
          var myfile1=JSON.stringify(newdata,null,5);
          fs.writeFileSync("parent.json",myfile1)
          console.log(myfile1)


          course_name=newdata["course"]["exercises"]
          serial_no1=1
          for(j in course_name){
          console.log(serial_no1,course_name[j]["name"])
          serial_no1++
          }

          question=a.questionInt("enter the question you want::")
          console.log(course_name[question])
          var slug=course_name[question]["content"][0]["value"]
          console.log(slug)
     })
     .catch(err1=>{
          console.log(err1)
     })
})
.catch(err=>{
     console.log(err)
})



     

