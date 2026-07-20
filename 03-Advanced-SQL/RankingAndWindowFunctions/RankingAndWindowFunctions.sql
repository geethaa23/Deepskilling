USE CognizantDB;
GO

SELECT
    EmployeeID,
    EmployeeName,
    Department,
    Salary,
    ROW_NUMBER() OVER (ORDER BY Salary DESC) AS RowNum
FROM Employee;
GO

SELECT
    EmployeeName,
    Salary,
    RANK() OVER (ORDER BY Salary DESC) AS RankNo
FROM Employee;
GO

SELECT
    EmployeeName,
    Salary,
    DENSE_RANK() OVER (ORDER BY Salary DESC) AS DenseRankNo
FROM Employee;
GO

SELECT
    EmployeeName,
    Department,
    Salary,
    ROW_NUMBER() OVER
    (
        PARTITION BY Department
        ORDER BY Salary DESC
    ) AS DeptRank
FROM Employee;
GO