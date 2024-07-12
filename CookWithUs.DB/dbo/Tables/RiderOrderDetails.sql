CREATE TABLE [dbo].[RiderOrderDetails](
    [ID] [int] IDENTITY(1,1) NOT NULL,
	[RiderID] [int] NULL,
	[OrderID] [int] NULL,
	[Price] [int] NULL,
	[OrderStatus] [varchar](50) NULL,
	PRIMARY KEY CLUSTERED ([ID] ASC)
);