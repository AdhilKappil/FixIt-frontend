import { useEffect } from "react";
import { Selected } from "../../../@types/Props";
import { TextField } from "@mui/material";
import { ServiceForm } from "../../../@types/validationTypes";
import { useFormik } from "formik";
import { serviceValidation } from "../../../components/common/Validation";

function Services_Mgmt({ setSelectedLink, link }: Selected) {
    useEffect(() => {
      setSelectedLink(link);
    }, []);
  
    const formik = useFormik<ServiceForm>({
      initialValues: {
        serviceName: "",
        firstHourPrice: 0,
        laterHourPrice: 0,
        description: "",
        imageFile: null,
      },
      validationSchema: serviceValidation,
      onSubmit: (values) => {
        // Handle form submission here
        console.log("Form submitted with values:", values);
      },
    });
  
    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full flex justify-center">
          <div className="text-2xl font-bold">Add New Service</div>
        </div>
        <div className="sm:flex gap-5 mt-10">
          <TextField
            className=" w-full my-3"
            label="Service Name"
            variant="outlined"
            {...formik.getFieldProps("serviceName")}
            error={formik.touched.serviceName && !!formik.errors.serviceName}
            helperText={formik.touched.serviceName && formik.errors.serviceName}
          />
          <TextField
            className=" w-full my-3"
            label="First hour charge"
            variant="outlined"
            {...formik.getFieldProps("firstHourPrice")}
            error={formik.touched.firstHourPrice && !!formik.errors.firstHourPrice}
            helperText={formik.touched.firstHourPrice && formik.errors.firstHourPrice}
          />
        </div>
  
        <div className="sm:flex gap-5 mt-5">
          <TextField
            className=" w-full my-3"
            label="Later hour charge"
            variant="outlined"
            {...formik.getFieldProps("laterHourPrice")}
            error={formik.touched.laterHourPrice && !!formik.errors.laterHourPrice}
            helperText={formik.touched.laterHourPrice && formik.errors.laterHourPrice}
          />
          <TextField
          className=" w-full my-3"
          type="file"
          label=""
          variant="outlined"
          onChange={(event) => {
            const file = (event.currentTarget as HTMLInputElement).files?.[0]; // Cast event.currentTarget to HTMLInputElement
            formik.setFieldValue("imageFile", file || null);
          }}
          error={formik.touched.imageFile && !!formik.errors.imageFile}
          helperText={formik.touched.imageFile && formik.errors.imageFile}
        />
        </div>
  
        <div className="my-3 mt-5">
          <TextField
            label="Description"
            className="w-full"
            variant="outlined"
            {...formik.getFieldProps("description")}
            error={formik.touched.description && !!formik.errors.description}
            helperText={formik.touched.description && formik.errors.description}
          />
        </div>
        <div className="w-full flex justify-center mt-5">
          <button type="submit" className="bg-blue-700 w-44 h-10 rounded-md">
            Add Service
          </button>
        </div>
      </form>
    );
  }
  
  export default Services_Mgmt;
  
