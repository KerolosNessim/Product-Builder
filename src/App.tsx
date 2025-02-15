import { ChangeEvent, FormEvent, useState } from "react";
import Modal from "./components/Modal/Modal";
import ProductCard from "./components/ProductCard/ProductCard";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import Error from "./components/Error/Error";
import CircleColor from "./components/CircleColor/CircleColor";
import { v4 as uuid } from "uuid";
import SelectMenu from "./components/SelectMenu/SelectMenu";
import { ProductNameTypes } from "./types";
import toast, { Toaster } from "react-hot-toast";
const App = () => {
  // variables
  const defaultProduct = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  // state
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [temp, setTemp] = useState<string[]>([]);
  const [selected, setSelected] = useState(categories[0]);
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProduct);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);

  // add modal functions
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  // edit modal functions
  const closeEditModal = () => setIsEditOpen(false);
  const openEditModal = () => setIsEditOpen(true);

  // edit modal functions
  const closeRemoveModal = () => setIsRemoveOpen(false);
  const openRemoveModal = () => setIsRemoveOpen(true);

  // onchage handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  // onchage handler
  const handleEditChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setProductToEdit({ ...productToEdit, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // oncancel handler
  const handleCancel = (): void => {
    setProduct(defaultProduct);
    setIsOpen(false);
  };

  // oncansel edit
  const handleEditCancel = (): void => {
    setIsEditOpen(false);
  };

  // onsubmit handler
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    const { title, description, imageURL, price } = product;
    e.preventDefault();
    const error = productValidation({
      title,
      description,
      imageURL,
      price,
    });

    const hasErrorsMsg =
      Object.values(error).some((value) => value === "") &&
      Object.values(error).every((value) => value === "");

    if (!hasErrorsMsg) {
      setErrors(error);
      return;
    }
    setProducts((prev) => [
      { ...product, id: uuid(), colors: temp, category: selected },
      ...prev,
    ]);
    setProduct(defaultProduct);
    setTemp([]);
    setIsOpen(false);
    toast("Product Added Successfuly", {
      style: {
        backgroundColor: "black",
        color: "white",
      },
      icon: "👌",
    });
  };

  // onedit handler
  const handleEditSubmit = (e: FormEvent<HTMLFormElement>): void => {
    const { title, description, imageURL, price } = productToEdit;
    e.preventDefault();
    const error = productValidation({
      title,
      description,
      imageURL,
      price,
    });

    const hasErrorsMsg =
      Object.values(error).some((value) => value === "") &&
      Object.values(error).every((value) => value === "");

    if (!hasErrorsMsg) {
      setErrors(error);
      return;
    }

    const editProducts = [...products];
    editProducts[productToEditIdx] = {
      ...productToEdit,
      colors: temp.concat(productToEdit.colors),
    };
    setProducts(editProducts);
    // setProductToEdit(defaultProduct);
    setTemp([]);
    setIsEditOpen(false);
    toast("Product Edited Successfuly", {
      style: {
        backgroundColor: "black",
        color: "white",
      },
      icon: "👌",
    });
  };

  // onRemove handler
  const handleRemoveProduct = () => {
    const filtered = products.filter(
      (product) => product.id != productToEdit.id
    );
    setProducts(filtered);
    closeRemoveModal();
    toast("Product Removed Successfuly", {
      style: {
        backgroundColor: "black",
        color: "white",
      },
      icon: "😒",
    });
  };

  // render inputs for form
  const renderInputs = formInputsList.map((input) => (
    <div key={input.id} className="flex flex-col">
      <label htmlFor={input.id} className="mb-1 font-semibold text-slate-600">
        {input.label}
      </label>
      <Input
        type={input.type}
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={handleChange}
      />
      <Error msg={errors[input.name]} />
    </div>
  ));

  // render edit inputs for form
  const renderEditProductWithError = (
    id: string,
    lable: string,
    name: ProductNameTypes
  ) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mb-1 font-semibold text-slate-600">
          {lable}
        </label>
        <Input
          type={"text"}
          id={id}
          name={name}
          value={productToEdit[name]}
          onChange={handleEditChange}
        />
        <Error msg={errors[name]} />
      </div>
    );
  };

  // render product colors
  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (temp.includes(color)) {
          setTemp((prev) => prev.filter((c) => c !== color));
          return;
        }
        if (productToEdit.colors.includes(color)) {
          setTemp((prev) => prev.filter((c) => c !== color));
          return;
        }
        setTemp((prev) => [...prev, color]);
      }}
    />
  ));

  // render products
  const renderProducts = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}
      openRemoveModal={openRemoveModal}
      setProductToEditIdx={setProductToEditIdx}
      idx={idx}
    />
  ));
  return (
    <main className="container mx-auto">
      <Toaster />
      <Button
        className="bg-indigo-600 hover:bg-indigo-800 mt-4 block mx-auto"
        width="w-fit"
        onClick={() => {
          openModal();
        }}
      >
        Add Product{" "}
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 m-5">
        {renderProducts}
      </div>

      {/* add product modal */}
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add New Product">
        <form onSubmit={handleSubmit} className="space-y-3">
          {renderInputs}
          <SelectMenu selected={selected} setSelected={setSelected} />

          <div className="flex items-center gap-1 flex-wrap">
            {temp.length > 0 &&
              temp.map((color) => (
                <span
                  key={color}
                  style={{ backgroundColor: color }}
                  className="text-sm rounded-md p-1 text-white"
                >
                  {color}
                </span>
              ))}
          </div>
          <div className="flex items-center space-x-2">
            {renderProductColors}
          </div>
          <div className="flex items-center justify-bettween space-x-3">
            <Button
              className="bg-indigo-600 hover:bg-indigo-800"
              width="w-full"
              type="submit"
            >
              submit{" "}
            </Button>
            <Button
              className="bg-slate-300 hover:bg-slate-400 text-slate-700"
              width="w-full"
              type="button"
              onClick={handleCancel}
            >
              cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/* edit product modal */}
      <Modal
        isOpen={isEditOpen}
        closeModal={closeEditModal}
        title="Edit Product"
      >
        <form onSubmit={handleEditSubmit} className="space-y-3">
          {renderEditProductWithError("title", "Product Title", "title")}
          {renderEditProductWithError(
            "description",
            "Product Description",
            "description"
          )}
          {renderEditProductWithError(
            "imageURL",
            "Product Image URL",
            "imageURL"
          )}
          {renderEditProductWithError("price", "Product Price", "price")}

          <SelectMenu
            selected={productToEdit.category}
            setSelected={(value) =>
              setProductToEdit({ ...productToEdit, category: value })
            }
          />
          <div className="flex items-center gap-1 flex-wrap">
            {productToEdit.colors.length > 0 &&
              temp.concat(productToEdit.colors).map((color) => (
                <span
                  key={color}
                  style={{ backgroundColor: color }}
                  className="text-sm rounded-md p-1 text-white"
                >
                  {color}
                </span>
              ))}
          </div>
          <div className="flex items-center space-x-2">
            {renderProductColors}
          </div>
          <div className="flex items-center justify-bettween space-x-3">
            <Button
              className="bg-indigo-600 hover:bg-indigo-800"
              width="w-full"
              type="submit"
            >
              submit{" "}
            </Button>
            <Button
              className="bg-slate-300 hover:bg-slate-400 text-slate-700"
              width="w-full"
              type="button"
              onClick={handleEditCancel}
            >
              cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/* delete product modal  */}
      <Modal
        isOpen={isRemoveOpen}
        closeModal={closeRemoveModal}
        title="Are You Sure You Want to Remove This Product?"
        describtion="Removing this product will delete it from your inventory and make it unavailable for future use.
Any associated data, including pricing and stock details, will also be lost.
Please confirm if you want to proceed with this action."
      >
        <div className="flex items-center justify-bettween space-x-3">
          <Button
            className="bg-red-600 hover:bg-red-800"
            width="w-full"
            onClick={handleRemoveProduct}
          >
            Remove
          </Button>
          <Button
            className="bg-slate-300 hover:bg-slate-400 text-slate-700"
            width="w-full"
            onClick={closeRemoveModal}
          >
            cancel
          </Button>
        </div>
      </Modal>
    </main>
  );
};

export default App;
