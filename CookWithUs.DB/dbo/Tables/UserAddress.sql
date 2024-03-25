CREATE TABLE [dbo].[UserAddress] (
    [Id]             INT           IDENTITY (1, 1) NOT NULL,
    [UserId]         INT           NULL,
    [Name]           VARCHAR (55)  NULL,
    [Country]        VARCHAR (50)  NULL,
    [StreetAddress]  VARCHAR (255) NULL,
    [StreetAddress2] VARCHAR (255) NULL,
    [City]           VARCHAR (50)  NULL,
    [State]          VARCHAR (40)  NULL,
    [Pincode]        VARCHAR (20)  NULL,
    [MobileNo]       VARCHAR (10)  NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

