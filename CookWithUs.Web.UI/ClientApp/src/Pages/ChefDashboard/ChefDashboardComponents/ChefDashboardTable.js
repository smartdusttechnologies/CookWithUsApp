import { useMemo, useState } from "react";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import DeleteComponent from "../../../Components/DeleteComponent/DeleteComponent";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { CreateMenu, UpdateMenu } from "../../../services/restaurantServices";

const Table = ({ data }) => {
  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "name",
        header: "Food  Name",
        muiEditTextFieldProps: {
          type: "text",
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          //remove any previous validation errors when food focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "type",
        header: "Type",
        muiEditTextFieldProps: {
          type: "text",
          required: true,
          error: !!validationErrors?.type,
          helperText: validationErrors?.type,
          //remove any previous validation errors when food focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              type: undefined,
            }),
        },
      },
      {
        accessorKey: "price",
        header: "Price",
        muiEditTextFieldProps: {
          type: "text",
          required: true,
          error: !!validationErrors?.price,
          helperText: validationErrors?.price,
          //remove any previous validation errors when food focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              price: undefined,
            }),
        },
      },
      {
        accessorKey: "imageUrl",
        header: "Image Url",
        size: 150,
        maxSize: 200,
        muiEditTextFieldProps: {
          type: "text",
          required: true,
          error: !!validationErrors?.imageUrl,
          helperText: validationErrors?.imageUrl,
          //remove any previous validation errors when food focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              imageUrl: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
    ],
    [validationErrors]
  );

  //call Createhook
  const { mutateAsync: createfood, isPending: isCreatingfood } =
    useCreatefood();
  //call READ hook
  const {
    data: fetchedfoods = [],
    isError: isLoadingfoodsError,
    isFetching: isFetchingfoods,
    isLoading: isLoadingfoods,
  } = useGetfoods(data);
  //call UPDATE hook
  const { mutateAsync: updatefood, isPending: isUpdatingfood } =
    useUpdatefood();
  //call DELETE hook
  const { mutateAsync: deletefood, isPending: isDeletingfood } =
    useDeletefood();

  //Createaction
  const handleCreatefood = async ({ values, table }) => {
    console.log(values);
    CreateMenu({
      id: 0,
      restaurantID: 1,
      name: values.name,
      type: values.type,
      price: values.price,
      quantity: values.quantity,
      imageUrl: values.imageUrl,
    })
      .then((response) => {
        console.log(response);
        table.setCreatingRow(null); //exit creating mode
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //UPDATE action
  const handleSavefood = async ({ values, table }) => {
    console.log(values);
    UpdateMenu({
      id: 7,
      restaurantID: 1,
      name: values.name,
      type: values.type,
      price: values.price,
      quantity: values.quantity,
      imageUrl: values.imageUrl,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    table.setEditingRow(null); //exit editing mode
  };

  const handleDeletefood = (id) => {
    axios
      .post(`/resturant/DeleteMenu/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const table = useMaterialReactTable({
    columns,
    data: data,
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingfoodsError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreatefood,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSavefood,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <DeleteComponent onDelete={handleDeletefood} id={row.original.id} />
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the Createrow modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Create
      </Button>
    ),
    state: {
      isLoading: isLoadingfoods,
      isSaving: isCreatingfood || isUpdatingfood || isDeletingfood,
      showAlertBanner: isLoadingfoodsError,
      showProgressBars: isFetchingfoods,
    },
  });

  return <MaterialReactTable table={table} />;
};

//Createhook (post new food to api)
function useCreatefood() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (food) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newfoodInfo) => {
      queryClient.setQueryData(["foods"], (prevfoods) => [
        ...prevfoods,
        {
          ...newfoodInfo,
          id: (Math.random() + 1).toString(36).substring(7),
        },
      ]);
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['foods'] }), //refetch foods after mutation, disabled for demo
  });
}

//READ hook (get foods from api)
function useGetfoods(data) {
  return useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      //send api request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve(data);
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put food in api)
function useUpdatefood() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (food) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newfoodInfo) => {
      queryClient.setQueryData(["foods"], (prevfoods) =>
        prevfoods?.map((prevfood) =>
          prevfood.id === newfoodInfo.id ? newfoodInfo : prevfood
        )
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['foods'] }), //refetch foods after mutation, disabled for demo
  });
}

//DELETE hook (delete food in api)
function useDeletefood() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (foodId) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (foodId) => {
      queryClient.setQueryData(["foods"], (prevfoods) =>
        prevfoods?.filter((food) => food.id !== foodId)
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['foods'] }), //refetch foods after mutation, disabled for demo
  });
}

const queryClient = new QueryClient();

const ChefDashboardTable = ({ data }) => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <Table data={data} />
  </QueryClientProvider>
);

export default ChefDashboardTable;

const validateRequired = (value) => !!value.length;

function validatefood(food) {
  return {
    name: !validateRequired(food.name) ? "First Name is Required" : "",
    // type: !validateRequired(food.type) ? "Last Name is Required" : "",
    // email: !validateEmail(food.email) ? "Incorrect Email Format" : "",
  };
}
