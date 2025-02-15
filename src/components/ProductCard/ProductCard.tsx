import { IProduct } from "../../interfaces";
import { formatPrice, textSlice } from "../../utils/functions";
import Button from "../Button/Button";
import CircleColor from "../CircleColor/CircleColor";
import Image from "../Image/Image";

interface IProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
  openRemoveModal: () => void;
  idx: number;
  setProductToEditIdx: (value: number) => void;
}
const ProductCard = ({
  product,
  setProductToEdit,
  openEditModal,
  openRemoveModal,
  setProductToEditIdx,
  idx,
}: IProps) => {
  // state
  const { title, description, imageURL, price, colors, category } = product;

  // onedit handler
  const handleEdit = () => {
    openEditModal();
    setProductToEdit(product);
    setProductToEditIdx(idx);
  };

  // onRemove handler
  const handleRemove = () => {
    openRemoveModal();
    setProductToEdit(product);
  };

  // color circle render
  const renderProductColors = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));
  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col">
      <Image
        imgUrl={imageURL}
        alt={title}
        className="rounded-md mb-2 h-48 w-full object-cover"
      />
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-slate-500 font-semibold mt-2">
        {textSlice(description, 70)}
      </p>
      {/* colors */}
      <div className="flex items-center  my-4 space-x-2">
        {colors.length > 0 ? (
          renderProductColors
        ) : (
          <p className="text-slate-500 text-sm font-semibold">
            Not avaliable colors!
          </p>
        )}
      </div>
      {/* price and categories */}
      <div className="flex items-center justify-between ">
        <span className="font-semibold ">
          <span className="text-indigo-600">$</span>
          {formatPrice(price)}
        </span>
        <div className="flex items-center gap-1">
          <p className="text-sm font-semibold text-slate-500">
            {category.name}
          </p>
          <Image
            imgUrl={category.imageURL}
            alt={category.name}
            className="size-10 rounded-full"
          />
        </div>
      </div>
      <div className="flex items-center justify-between space-x-2 mt-4">
        <Button
          className="bg-indigo-600 hover:bg-indigo-800"
          width="w-full"
          onClick={() => {
            handleEdit();
          }}
        >
          Edit
        </Button>
        <Button
          className="bg-red-600 hover:bg-red-800"
          width="w-full"
          onClick={handleRemove}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
