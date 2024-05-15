CREATE TABLE [dbo].[MenuCategory](
	[RestaurantId] [nchar](10) NULL,
	[CategoryName] [nvarchar](50) NULL,
	[InStock] [nchar](10) NULL,
	[NextStockTime] [varchar](50) NULL,
	[IsDeleted] [nchar](10) NULL,
	[Id] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_MenuCategory] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[MenuCategory] ADD  CONSTRAINT [DF_Table_1_IsActive]  DEFAULT ((0)) FOR [IsDeleted]
GO