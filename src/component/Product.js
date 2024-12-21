import React, { useEffect, useState, useRef } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { Additem } from './card_slice';
import axios from "axios";
import { Toast } from 'primereact/toast';
import { useForm } from "react-hook-form";
import Slider from "@mui/material/Slider";

const Product = () => {
    const [products, setproducts] = useState([])
    const [masterCategorydata, setmasterCategorydata] = useState([])
    const [filteredCategorydata, setfilteredCategorydata] = useState([]);
    const [masterItemTypedata, setmasterItemTypedata] = useState([])
    const [masterSectiondata, setmasterSectiondata] = useState([])
    const [price, setPrice] = useState([0, 2000]);
    const [maxprice, setMaxprice] = useState();
    const dispatch = useDispatch()
    const toast = useRef(null);

    const { register, handleSubmit, setValue, getValues, clearErrors, formState: { errors } } = useForm({
        //defaultValues: state,
    });
    useEffect(() => {
        axios.get("http://localhost:8082/api/Document/GetMasterData").then(response => {
            setmasterCategorydata(response.data.Categories);
            setmasterItemTypedata(response.data.ItemTypes);
            setmasterSectiondata(response.data.Sections);
        })
            .catch(e => console.error("Error fetching documents:", e));

        const param = {
            "id": 0,
            "categoryId": 0,
            "price": maxprice == undefined ? null : maxprice,
            "itemTypeId": 0,
            "sectionId": 0
        }
        axios({ url: "http://localhost:8082/api/Document/GetDocument", method: "POST", data: param })
            .then(response => {
                setproducts(response.data.documents);
                const maxPriceObject = response.data.documents.reduce((max, current) =>
                    current.price > max.price ? current : max, response.data.documents[0]);
                setMaxprice(maxPriceObject.price)
            })
            .catch(e => console.error("Error fetching documents:", e));
    }, []);

    const handleAddToCart = (product) => {
        dispatch(Additem(product));
        toast.current.show({ severity: "success", summary: "Added", detail: `${product.title} has been added to your cart!`, life: 3000, });
    };

    const handleRegistration = async (data, e) => {
        const params = {
            "id": 0,
            "categoryId": data.Category == "" ? 0 : parseInt(data.Category),
            "price": data.price === "0" ? maxprice : data.price,
            "itemTypeId": data.itemType == "" ? 0 : parseInt(data.itemType),
            "sectionId": data.section == "" ? 0 : parseInt(data.section)
        }

        await axios({ url: "http://localhost:8082/api/Document/GetDocument", method: "POST", data: params })
            .then(response => {
                setproducts(response.data.documents);
            })
            .catch(e => console.error("Error fetching documents:", e));
    }

    function handleChanges(event, newValue) {
        setPrice(newValue);
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
            <form onSubmit={handleSubmit(handleRegistration)}>
                <div className='row'>
                    <div className="col-sm-2">
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
                    <div className="col-sm-2">
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
                    <div className="col-sm-2">
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
                    <div className="col-sm-2">
                        <div className="mb-3">
                            <label className="form-label"> Price</label>
                            <Slider
                                aria-label="Always visible"
                                {...register("price")}
                                onChange={handleChanges}
                                step={10}
                                min={0}
                                max={maxprice}
                                valueLabelDisplay="auto" />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="mb-3">
                            <button className="previous btn-hover color-5  mx-1 " value="submit" name="submit" type="submit"> <i className="bi bi-save"></i>Search</button>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    {products.length > 0 && products.map(product => (
                        <div className='col-md-3' style={{ marginBottom: "10px" }}>
                            <Card key={product.Id} className='h-100'>
                                <div className="text-center" style={{ "margin-top": "10px" }}>
                                    <Card.Img variant="top" src={product.documentBase64} style={{ wIdth: "80px", height: "300px" }} />
                                </div>
                                <Card.Body>
                                    <Card.Title>{product.title} </Card.Title>
                                    <Card.Text>
                                        <i class="bi bi-currency-rupee"></i>
                                        INR: {product.price}
                                    </Card.Text>

                                </Card.Body>
                                <Card.Footer className='text-center' style={{ backgroundColor: "white" }}>
                                    <Button variant="btn btn-success" onClick={() => handleAddToCart(product)}>Add To Card</Button>
                                </Card.Footer>
                            </Card>
                        </div>
                    ))}
                </div >
            </form>
            <Toast ref={toast} position="top-center" className="p-toast" />
        </>
    )
}

export default Product;