// Your code here
function createEmployeeRecord(employee){
  const record = {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents:[]
  }
  return record
}

function createEmployeeRecords(arrayOfEmployees){
    const newArrayOfEmployee = arrayOfEmployees.map(createEmployeeRecord)
    return newArrayOfEmployee
}

function createTimeInEvent(employee, dateStamp){
    let hours = dateStamp.split(" ")[1]
    let dates = dateStamp.split(" ")[0]
    const timeInEventObject = {
        type:'TimeIn',
        hour: parseInt(hours),
        date: dates
    }
    employee.timeInEvents.push(timeInEventObject)
    return employee
}

function createTimeOutEvent(employee, dataStamp){
    let hours = dataStamp.split(" ")[1]
    let dates = dataStamp.split(" ")[0]
    const timeOutEventObject = {
        type: 'TimeOut',
        hour: parseInt(hours),
        date: dates
    }
    employee.timeOutEvents.push(timeOutEventObject)
    return employee
}

function hoursWorkedOnDate(employee,form){
   let employeeIn = employee.timeInEvents.find((element)=>{
    return element.date === form
   }) 
   let employeeOut = employee.timeOutEvents.find((element)=>{
    return element.date === form
   })
   return (employeeOut.hour-employeeIn.hour)/100
}

function wagesEarnedOnDate(employee,form){
    return employee.payPerHour * hoursWorkedOnDate(employee,form)

}


function allWagesFor(employee){
    const avaliableDate = employee.timeInEvents.map((element)=>{
        return element.date
    })
   
    // const datePay = avaliableDate.map(element=>wagesEarnedOnDate(employee,element))
  
    const payOwed = avaliableDate.reduce((previousValue, currentValue) => {
    return previousValue + wagesEarnedOnDate(employee,currentValue) 
},0)
   return payOwed
}

function calculatePayroll(employee){
   const payRoll =employee.map((object)=>object.timeInEvents.map((element)=>wagesEarnedOnDate(object,element.date))).map((array)=>array.reduce((previous,current)=>previous+current,0))
   return payRoll.reduce((prev,curr)=>prev+curr,0)
}