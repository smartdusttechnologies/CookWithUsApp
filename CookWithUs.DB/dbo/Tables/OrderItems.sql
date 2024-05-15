CREATE TABLE [dbo].[OrderItems](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[OrderId] [int] NULL,
	[Name] [varchar](100) NULL,
	[ItemId] [int] NULL,
	[Quantity] [int] NULL,
	[RestaurantId] [int] NULL,
	[Price] [decimal](10, 2) NULL,
	[DiscountedPrice] [decimal](10, 2) NULL,
	[Time] [datetime] NULL,
	[RestaurantLocation] [varchar](100) NULL,
	[RestaurantName] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO