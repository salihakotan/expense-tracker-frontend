import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../store'
import { AppDispatch } from '../../store/store';
import { getCategories } from '../../store/actions/categoryActions';
import { getRecords } from '../../store/actions/recordActions';

function BudgetData() {
    const dispatch: AppDispatch = useDispatch();


    const { data: categoryData, loading: catLoading } = useSelector((state: AppState) => state.categories);
    const { data: recordsData, loading: recLoading } = useSelector((state: AppState) => state.records);
     console.log(categoryData);
        console.log(recordsData);


        useEffect(() => {
            if (!catLoading && categoryData.length <= 0) {
                dispatch(getCategories())
            }
        }, [categoryData, catLoading])
    
    
        useEffect(() => {
            if (!recLoading && recordsData.length <= 0) {
                dispatch(getRecords())
            }
        }, [recordsData, recLoading])
    

        
        let totalBudget = 0;
        let incomeBudget=0, expenseBudget = 0;
  return (
    <>

<h1 className='pageTitle'>Budget Data</h1>

<div style={{padding:30,margin:10,backgroundColor:"#e4e4e4" ,fontSize:18}}>
    {
        recordsData.map((record)=> {
            {totalBudget += record.amount}
            {record.category.type ==="expense" ? expenseBudget += record.amount : incomeBudget += record.amount}
          return  <div>
            
            {record.title}------
           
            <span style={{fontWeight:'bold', fontSize:20, color:'darkBlue'}}>
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
    
    <div style={{padding:30, margin:10, backgroundColor:"#ffd7f1" ,fontSize:18}}>
    <span>   Total budget:</span>  <span  style={{ fontWeight:'bold', color:"darkBlue", fontSize:18}}>&nbsp; { Intl.NumberFormat("en-US", {
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