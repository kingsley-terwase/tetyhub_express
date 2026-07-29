import { LayerRegular, TagRegular } from "@fluentui/react-icons";
import {
  Stack,
  OutlinedInput,
  FormControl,
  Chip,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import SectionLabel from "../SectionLabel";
import FieldLabel from "../FieldLabel";
import { spacingTokens } from "@/lib/theme";
import { useProductStyles } from "@/contexts/products";

// @ts-ignore
function TagInput({ tags, tagInput, setTagInput, setTags }) {
  const s = useProductStyles();

  const handleKeyDown = (
    /** @type {{ key: string; preventDefault: () => void; }} */ e,
  ) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const val = tagInput.trim().replace(/,$/, "");
      if (val && !tags.includes(val) && tags.length < 10)
        setTags((/** @type {any} */ prev) => [...prev, val]);
      setTagInput("");
    }
    if (e.key === "Backspace" && !tagInput && tags.length)
      setTags((/** @type {string | any[]} */ prev) => prev.slice(0, -1));
  };

  return (
    <FormControl fullWidth>
      <FieldLabel hint="Press Enter or comma to add">Tags</FieldLabel>
      <Box
        sx={s.tagInputWrapper}
        onClick={() => document.getElementById("tag-input")?.focus()}
      >
        {tags.map(
          (
            /** @type {boolean | import("react").Key | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<import("react").ReactNode> | Promise<string | number | bigint | boolean | import("react").ReactPortal | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<import("react").ReactNode> | null | undefined> | null | undefined} */ tag,
          ) => (
            <Chip
              // @ts-ignore
              key={tag}
              label={tag}
              size="small"
              onDelete={() =>
                setTags((/** @type {any[]} */ prev) =>
                  prev.filter((/** @type {any} */ t) => t !== tag),
                )
              }
              icon={<TagRegular style={s.tagChipIcon} />}
              sx={s.tagChip}
            />
          ),
        )}
        {tags.length < 10 && (
          <Box
            component="input"
            id="tag-input"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? "wireless, portable, sale..." : ""}
            sx={s.tagNativeInput}
          />
        )}
      </Box>
      <Typography variant="caption" sx={s.tagCount}>
        {tags.length}/10 tags
      </Typography>
    </FormControl>
  );
}

/**
 * @param {{ tags: any, tagInput: any, setTagInput: any, setTags: any }} props
 */
export default function OrganisationSection({
  tags,
  tagInput,
  setTagInput,
  setTags,
}) {
  const s = useProductStyles();

  return (
    <Box sx={s.sectionWrapper}>
      <SectionLabel icon={LayerRegular} label="Organisation" />
      <Stack gap={spacingTokens.md}>
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <FieldLabel>Brand</FieldLabel>
              <OutlinedInput
                placeholder="e.g. Sony, Nike, Unbranded"
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <FieldLabel>Supplier / Vendor</FieldLabel>
              <OutlinedInput
                placeholder="e.g. Jumia, Konga Warehouse"
                fullWidth
              />
            </FormControl>
          </Grid>
        </Grid>

        <TagInput
          tags={tags}
          tagInput={tagInput}
          setTagInput={setTagInput}
          setTags={setTags}
        />
      </Stack>
    </Box>
  );
}
