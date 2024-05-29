import { useState } from "react";
import { TextField } from "@mui/material";
import { MyError, ServiceForm } from "../../../validation/validationTypes";
import { useFormik } from "formik";
import { serviceValidation } from "../../../validation/yupValidation";
import { storage } from "../../../app/firebase/confiq";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useCreateServiceMutation } from "../../../slices/api/adminApiSlices";
import { toast } from "react-toastify";
import { AddNewServicesProps } from "../../../@types/Props";
import Spinner from "../../../components/common/Spinner";


function AddNewServices({ setAddService }: AddNewServicesProps) {
     
      const [createService] = useCreateServiceMutation();
      const [imagePreview, setImagePreview] = useState<string | null>(null);
      const [isSumbit, setSubmit] = useState(false)

    
      const formik = useFormik<ServiceForm>({
        initialValues: {
          serviceName: "",
          description: "",
          firstHourCharge: "",
          laterHourCharge: "",
          imageFile: null,
        },
        validationSchema: serviceValidation,
        onSubmit: async (values) => {
          setSubmit(true)
          // Create a storage reference with the generated filename
          const img: any = values.imageFile;
          console.log(values);
          
    
          const fileName = `${Date.now()}.jpg`;
    
          const storageRef = ref(storage, `/images/service/${fileName}`);
          // Upload the file
          const snapshot = await uploadBytes(storageRef, img);
    
          // Get the download URL of the uploaded image
          const downloadURL = await getDownloadURL(snapshot.ref);
    
          const service_img = downloadURL;
    
          try {
            const { serviceName,description, firstHourCharge, laterHourCharge} = values; // Destructure values
           const res = await createService({ serviceName, service_img, description, firstHourCharge, laterHourCharge }).unwrap();
            setSubmit(false)
            setAddService(false);
            toast.success(res.newService);
          } catch (err) {
            toast.error((err as MyError)?.data?.message || (err as MyError)?.error);
            setSubmit(false)
          }
        },
      });
    
      const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        formik.setFieldValue("imageFile", file || null);
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result as string);
          };
          reader.readAsDataURL(file);
        } else {
          setImagePreview(null);
        }
      };
    
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
              type="file"
              label=""
              variant="outlined"
              onChange={handleImageChange}
              error={formik.touched.imageFile && !!formik.errors.imageFile}
              helperText={formik.touched.imageFile && formik.errors.imageFile}
            />
          </div>
          <div className="sm:flex gap-5 mt-10">
          <TextField
          className=" w-full my-3"
          label="First hour charge"
          variant="outlined"
          {...formik.getFieldProps("firstHourCharge")}
          error={
            formik.touched.firstHourCharge && !!formik.errors.firstHourCharge
          }
          helperText={
            formik.touched.firstHourCharge && formik.errors.firstHourCharge
          }
        />
              <TextField
          className=" w-full my-3"
          label="Later hour charge"
          variant="outlined"
          {...formik.getFieldProps("laterHourCharge")}
          error={
            formik.touched.laterHourCharge && !!formik.errors.laterHourCharge
          }
          helperText={
            formik.touched.laterHourCharge && formik.errors.laterHourCharge
          }
        />
          </div>
          <div className="my-3">
            <TextField
              label="Description"
              className="w-full"
              variant="outlined"
              {...formik.getFieldProps("description")}
              error={formik.touched.description && !!formik.errors.description}
              helperText={formik.touched.description && formik.errors.description}
            />
          </div>
    
          {imagePreview && (
            <div className="my-3">
              <img
                src={imagePreview}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </div>
          )}
    
          <div className="w-full flex justify-center my-3">
            <button type="submit" className="bg-blue-700 w-44 h-10 rounded-md">
              {isSumbit ? <Spinner/> : "Add Service" }
            </button>
          </div>
        </form>
  )
}

export default AddNewServices