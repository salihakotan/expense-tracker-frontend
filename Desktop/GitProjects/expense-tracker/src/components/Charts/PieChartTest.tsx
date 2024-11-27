import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../store'


import { Chart } from "react-google-charts";
import { getRecords } from '../../store/actions/recordActions';
import { AppDispatch } from '../../store/store';
import { getCategories } from '../../store/actions/categoryActions';


function PieChartTest() {


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




    const parsedData = recordsData.map((item) => JSON.parse(JSON.stringify(item)));


    const chartData = [
        ["Title", "Category", "Amount"], // Sütun başlıkları
        ...parsedData.map(item => [item.title, item.category_id.name, item.amount])
    ];


    const controls = [
        {
            controlType: "NumberRangeFilter" as const, // Burada sabit bir değer kullanılıyor
            options: {
                filterColumnLabel: "Amount",
                ui: {
                    label: "Filter by Amount",
                },
            },
        },
        {
            controlType: "CategoryFilter" as const, // Burada sabit bir değer kullanılıyor
            options: {
                filterColumnLabel: "Category",
                ui: {
                    label: "Filter by Category",
                    allowTyping: false,
                    allowMultiple: true,
                },
            },
        },
    ];
    const chartOptions = {
        cssClassNames: {
            headerRow: "custom-table-header",
            tableRow: "custom-table-row",
            oddTableRow: "custom-odd-row",
            selectedTableRow: "custom-selected-row",
            hoverTableRow: "custom-hover-row",
        },

    };

  

    const pieChartOptions = {
       
        pieHole: 0.4, // Creates a Donut Chart. Does not do anything when is3D is enabled
        is3D: true, // Enables 3D view
        // slices: {
        //   1: { offset: 0.2 }, // Explodes the second slice
        // },
        pieStartAngle: 100, // Rotates the chart
        titleTextStyle: {
            color: "#000", // Başlık rengi
            fontSize: 18,     // Başlık boyutu
            bold: true,       // Kalın yazı
          },
        sliceVisibilityThreshold: 0.02, // Hides slices smaller than 2%
        legend: {
            position: "bottom",
            alignment: "center",
            width: 100,
            textStyle: {
                color: "#233238",
                fontSize: 14,
            },
        },
        colors: ["#00d5f1", "#00e5cc", "#c5cd4b", "#f40070","#bd00cd","#00cd48"],
    };


    const incomeData = parsedData
  .filter(item => item.category.type === "income") // Sadece "income" olanları filtrele
  .map(item => [item.title, item.amount]); // Gerekli formatta veri hazırlama

const expenseData = parsedData
  .filter(item => item.category.type === "expense") // Sadece "expense" olanları filtrele
  .map(item => [item.title, item.amount]); // Gerekli formatta veri hazırlama

const incomeChartData = [["Title", "Amount"], ...incomeData]; // Başlıkları ekle
const expenseChartData = [["Title", "Amount"], ...expenseData]; // Başlıkları ekle

    let totalBudget = 0;
    let incomeBudget = 0, expenseBudget = 0;
    return (

        <>
            {
                recordsData && categoryData && !recLoading && !catLoading &&


                <div style={{ display: "grid", rowGap: "50px" }}>

                    <div className='chartArea'>
                        <h2>Income and Expense Budgets</h2>
                        <div className='chart-grid'>
                            <div className='chart-item'>
                                <Chart
                                    chartType="PieChart"
                                    data={incomeChartData}
                                    options={{...pieChartOptions,title:"Income"}}
                                    
                                    width={"100%"}
                                    height={"400px"}
                                    

                                />
                            </div>
                            <div className='chart-item'>
                                <Chart
                                    chartType="PieChart"
                                    data={expenseChartData}
                                    options={{...pieChartOptions,title:"Expense"}}
                                    width={"100%"}
                                    height={"400px"}

                                /></div>
                        </div>

                    </div>

                    <div className='chartArea'>
                        <h2>Filter by Amount or Category</h2>
                        <Chart
                            style={{ display: 'grid', rowGap: "20px" }}
                            chartType="Table"
                            width="100%"
                            height="400px"
                            data={chartData}
                            chartPackages={["corechart", "controls"]}
                            controls={controls}
                            options={chartOptions}

                        />
                    </div>


                </div>
            } </>
    )

}

export default PieChartTest