CREATE TABLE [dbo].[VariantOption](
	[VariantName] [varchar](50) NULL,
	[OptionName] [varchar](50) NULL,
	[OptionType] [varchar](50) NULL,
	[OptionPrice] [int] NULL,
	[IsDeleted] [int] NULL,
	[MenuId] [int] NULL,
	[Id] [int] IDENTITY(1,1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[VariantOption] ADD  CONSTRAINT [DF_VariantOption_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO