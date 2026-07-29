import { useState } from "react";
import { Box, Divider, Typography, Button } from "@mui/material";
import ProductMediaSection from "./ProductMediaSection";
import BasicInfoSection from "./BasicInfoSec";
import PricingSection from "./PricingSec";
import InventorySection from "./InventorySec";
import OrganisationSection from "./OrganisationSec";
import VisibilitySection from "./VisibilitySec";
import { useProductStyles } from "@/contexts/products";
// import { Button } from "@/components/ui";
export default function AddProductPage() {
  const s = useProductStyles();

  const [images, setImages] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("active");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [comparePrice, setComparePrice] = useState("");
  const [sku, setSku] = useState("");
  const [stock, setStock] = useState("");
  const [weight, setWeight] = useState("");
  const [availability, setAvailability] = useState("in_stock");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const handleDrop = (
    /** @type {{ preventDefault: () => void; dataTransfer: { files: any; }; target: { files: any; }; }} */ e,
  ) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer?.files || e.target.files || []);
    const previews = files
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 6 - images.length)
      .map((f) => ({ url: URL.createObjectURL(f), name: f.name }));
    // @ts-ignore
    setImages((prev) => [...prev, ...previews].slice(0, 6));
  };

  return (
    <Box>
      <Box sx={s.pageInner}>
        <Box sx={s.pageHeader}>
          <Typography sx={s.pageTitle}>Add New Product</Typography>
          <Typography sx={s.pageCaption}>
            Fill in the details below to list a new product in your catalogue
          </Typography>
        </Box>

        <Box sx={s.pageCard}>
          <Box sx={s.pageCardInner}>
            <ProductMediaSection
              images={images}
              dragOver={dragOver}
              onDrop={handleDrop}
              onDragOver={(
                /** @type {{ preventDefault: () => void; }} */ e,
              ) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onRemove={(/** @type {number} */ idx) =>
                setImages((prev) => prev.filter((_, i) => i !== idx))
              }
            />
            <Divider sx={s.divider} />
            <BasicInfoSection
              productName={productName}
              setProductName={setProductName}
              category={category}
              setCategory={setCategory}
              status={status}
              setStatus={setStatus}
              description={description}
              setDescription={setDescription}
            />
            <Divider sx={s.divider} />
            <PricingSection
              price={price}
              setPrice={setPrice}
              comparePrice={comparePrice}
              setComparePrice={setComparePrice}
            />
            <Divider sx={s.divider} />
            <InventorySection
              sku={sku}
              setSku={setSku}
              stock={stock}
              setStock={setStock}
              weight={weight}
              setWeight={setWeight}
              availability={availability}
              setAvailability={setAvailability}
            />
            <Divider sx={s.divider} />
            <OrganisationSection
              tags={tags}
              setTags={setTags}
              tagInput={tagInput}
              setTagInput={setTagInput}
            />
            <Divider sx={s.divider} />
            <VisibilitySection
              isFeatured={isFeatured}
              setIsFeatured={setIsFeatured}
            />
            <Button sx={s.publishBtn}>Add Product</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
