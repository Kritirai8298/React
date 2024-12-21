import React, { useState, useRef, useEffect } from 'react'
import axios from "axios";
import { useForm } from "react-hook-form";
import { Image } from 'primereact/image';
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/saga-blue/theme.css"; // or any theme of your choice
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const AddProduct = () => {
    const [attachments, setAttachments] = useState({
        photos: [],
    });
    const [masterCategorydata, setmasterCategorydata] = useState([])
    const [masterItemTypedata, setmasterItemTypedata] = useState([])
    const [masterSectiondata, setmasterSectiondata] = useState([])
    const [filteredCategorydata, setfilteredCategorydata] = useState([]);
    const fileInputRef = useRef(null);
    const { control, register, handleSubmit, setValue, getValues, clearErrors, formState: { errors } } = useForm({
        //defaultValues: state,
    });
    const toast = useRef(null);
    const fileToDataUri = async (image) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                resolve({
                    base64: reader.result,
                });
            });
            reader.readAsDataURL(image);
        });
    };

    useEffect(() => {
        axios.get("http://localhost:8082/api/Document/GetMasterData").then(response => {
            setmasterCategorydata(response.data.Categories);
            setmasterItemTypedata(response.data.ItemTypes);
            setmasterSectiondata(response.data.Sections);
        })
            .catch(e => console.error("Error fetching documents:", e));

    }, []);

    const PhotosChange = async (event) => {
        clearErrors("file", '')
        var lst_images = [];

        for (let i = 0; i < event.target.files.length; i++) {
            const item = event.target.files[i];
            let img = await fileToDataUri(item);

            lst_images.push({
                "documentName": item.name,
                "documentbase64": img.base64,
                "docType": item.type,
                "category": "string",
                "path": "string",
                "title": "string",
                "price": 0
            });
        }

        setAttachments((prevAttachments) => ({
            ...prevAttachments,
            photos: [...prevAttachments.photos, ...lst_images],
        }));
    }


    const handleRegistration = async (data, e) => {

        const param = {
            "action": "I",
            // "doc_det": attachments.photos,
            "doc_det": [
                {
                    "documentName": attachments.photos[0].documentName,
                    "documentbase64": attachments.photos[0].documentbase64,
                    "docType": attachments.photos[0].docType,
                    "categoryId": parseInt(data.Category),
                    "path": "string",
                    "title": data.title,
                    "price": parseFloat(data.price),
                    "itemTypeId": parseInt(data.itemType),
                    "sectionId": parseInt(data.section),
                }
            ]

        }
        await axios({ url: "http://localhost:8082/api/Document/IUD_Document", method: "POST", data: param, })
            .then(response => {
                response = response;
                setValue("Category", "")
                setValue("title", "")
                setValue("price", "")
                setValue("itemType", "")
                setValue("section", "")
                attachments.photos = []
                fileInputRef.current.value = '';
                toast.current.show({ severity: "success", summary: "Submitted", detail: "Product Added Successfully", life: 3000, });
            })
            .catch(e => {
                console.error("Error adding data:", e);
            });
    }
    const handleItemTypeChange = (event) => {
        const selectedValue = event.target.value;
        const filtered = masterCategorydata.filter(
            (item) => item.ItemTypeId.toString() === selectedValue
        );
        setfilteredCategorydata(filtered);
    };
    return (
        <>
            <h2>Add Products</h2>
            <Toast ref={toast} position="top-center" className="p-toast" />
            <form onSubmit={handleSubmit(handleRegistration)}>
                <div className="col-sm-4">
                    <div className="mb-3">
                        <label className="form-label"> section </label>
                        <select className="form-select" name="section" id="section" {...register("section")} >
                            <option value="">--Choose--</option>
                            {
                                masterSectiondata.map((section) => (
                                    <option key={section.Id} value={section.Id}>{section.Name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="mb-3">
                        <label className="form-label">
                            Item Type
                        </label>
                        <select className="form-select" name="itemType" id="itemType" {...register("itemType")} onChange={handleItemTypeChange} >
                            <option value="">--Choose--</option>
                            {
                                masterItemTypedata.map((itemType) => (
                                    <option key={itemType.Id} value={itemType.Id}>{itemType.Name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="mb-3">
                        <label className="form-label">
                            Category
                        </label>
                        <select className="form-select" name="Category" id="Category" {...register("Category")} >
                            <option value="">--Choose--</option>
                            {filteredCategorydata.length > 0 ?
                                (
                                    filteredCategorydata.map((category) => (
                                        <option key={category.Id} value={category.Id}>{category.Name}</option>
                                    ))
                                )
                                :
                                (
                                    masterCategorydata.map((category) => (
                                        <option key={category.Id} value={category.Id}>{category.Name}</option>
                                    ))
                                )
                            }
                        </select>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="mb-3">
                        <label className="form-label">
                            Title
                        </label>
                        <input className="form-control" name="title" id="title" {...register("title")} />
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="mb-3">
                        <label className="form-label">
                            Price
                        </label>
                        <input className="form-control" name="price" id="price" {...register("price")} />
                    </div>
                </div>
                <div className="form-section mt-4">
                    <div className="col-sm-12 pt-3">
                        <div className=" table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ width: "200px" }}>
                                            Upload <i className="bi bi-asterisk redAstrk" />
                                        </th>
                                        <th style={{ width: "300px" }}>
                                            Document
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input
                                                name="file" type="file" id="file" className="form-control" ref={fileInputRef}
                                                onChange={(e) => PhotosChange(e)} accept="image/jpeg,image/png,application/pdf" />
                                            <small className="text-black-50 d-block">Upload *.jpeg,*.png,*.pdf files only</small>
                                        </td>
                                        <td>
                                            <br></br>
                                            {(attachments.photos)?.length > 0 && (
                                                <div style={{ display: 'flex' }}><label className="form-label ">&nbsp;</label>
                                                    {(attachments.photos).map((data, index1) => (
                                                        <div key={index1}>
                                                            <Image alt="Image" width="48px" height="48px" preview src={data.documentbase64} title={data.documentName} />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <button className="previous btn-hover color-5  mx-1 " value="submit" name="submit" type="submit"> <i className="bi bi-save"></i>Submit</button>
            </form>
        </>
    )
}
export default AddProduct;