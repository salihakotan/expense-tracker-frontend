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

<table
        style={{
            backgroundColor:"white",
          width: "80%",
          margin: "20px auto",
          borderCollapse: "collapse",
          fontSize: "16px",
          textAlign: "left",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Title</th>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Amount</th>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Type</th>
          </tr>
        </thead>
        <tbody>
          {recordsData.map((record) => {
            totalBudget += record.amount;
            record.category.type === "expense"
              ? (expenseBudget += record.amount)
              : (incomeBudget += record.amount);

            return (
              <tr key={record.id}>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                  {record.title}
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    fontWeight: "bold",
                    color: "gray",
                  }}
                >
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(record.amount)}
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    color: record.category.type === "expense" ? "red" : "green",
                  }}
                >
                  {record.category.type}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div
        style={{
            backgroundColor:"white",
          padding: "20px",
          margin: "10px auto",
          fontSize: "16px",
          width: "80%",
          textAlign: "center",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <p>
          <strong>Total Budget: </strong>
          <span style={{ color: "darkBlue" }}>
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(totalBudget)}
          </span>
        </p>
        <p>
          <strong>Income Budget: </strong>
          <span style={{ color: "green" }}>
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(incomeBudget)}
          </span>
        </p>
        <p>
          <strong>Expense Budget: </strong>
          <span style={{ color: "red" }}>
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(expenseBudget)}
          </span>
        </p>
      </div>
      </>
  )
}

export default BudgetData