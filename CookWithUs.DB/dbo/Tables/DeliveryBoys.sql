CREATE TABLE [dbo].[DeliveryBoys] (
    [ID]        INT           IDENTITY (1, 1) NOT NULL,
    [Name]      VARCHAR (255) NULL,
    [Age]       INT           NULL,
    [MobileNo]  VARCHAR (15)  NULL,
    [Pincode]   VARCHAR (10)  NULL,
    [Latitude]  FLOAT (53)    NULL,
    [Longitude] FLOAT (53)    NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC)
);

