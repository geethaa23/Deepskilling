USE CognizantDB;
GO

CREATE PROCEDURE GetAllEmployees
AS
BEGIN
    SELECT * FROM Employee;
END;
GO

EXEC GetAllEmployees;