import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'

function BudgetData() {


        const {data:categoryData} = useSelector((state:AppState) => state.categories);
        const {data:recordsData} = useSelector((state:AppState) => state.records);
        console.log(categoryData);
        console.log(recordsData);

        let totalBudget = 0;
        let incomeBudget=0, expenseBudget = 0;
  return (
    <>

<div style={{padding:30,margin:20,backgroundColor:"#e4e4e4" ,fontSize:18}}>
    {
        recordsData.map((record)=> {
            {totalBudget += record.amount}
            {record.category.type ==="expense" ? expenseBudget += record.amount : incomeBudget += record.amount}
          return  <div>
            
            {record.title}------
           
            <span style={{fontWeight:'bold', fontSize:20, color:'blue'}}>
                -----------
                {
                    Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD"
                    }).format(record.amount)
                }
                -----------
            </span>
            
            <span>------{record.category.type}</span>
           </div>
        })
        
        
    }
    </div>
    
    <div style={{padding:30, margin:20, backgroundColor:"#ffd7f1" ,fontSize:18}}>
    <span>   Total budget:</span>  <span  style={{fontWeight:'bold', color:"blue", fontSize:18}}>&nbsp; { Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD"
                    }).format(totalBudget)} </span> <br/>
      <span> Income budget:</span> <span  style={{fontWeight:'bold', color:"green", fontSize:18}}>&nbsp;  { Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD"
                    }).format(incomeBudget)}</span> <br/>
       <span> Expense budget:</span> <span  style={{fontWeight:'bold', color:"red", fontSize:18}}>&nbsp; { Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD"
                    }).format(expenseBudget)}</span> <br/>
    </div>
    </>
  )
}

export default BudgetData