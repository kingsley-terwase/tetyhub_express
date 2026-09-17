// @ts-nocheck
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Stack,
    Typography,
    InputBase,
    Switch,
    Select,
    MenuItem,
    Button,
    IconButton,
} from "@mui/material";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import axiosInstance from "@/Utils/AxiosInstance";
import { useCreateService, useUpdateService } from "@/Hooks/services";

// Same "3 fixed options, no confirmed enum values" situation as location_type
// below — assumed based on common booking-service shapes. Confirm against
// the backend and adjust the `id`s if they differ.
const LOCATION_TYPES = [
    { id: "vendor_location", label: "At vendor's location" },
    { id: "customer_location", label: "At customer's location" },
    { id: "remote", label: "Remote" },
];

const DEFAULT_FORM = {
    name: "",
    short_description: "",
    description: "",
    category_id: "",
    subcategory_id: "",
    currency_id: "",
    base_price: "",
    compare_at_price: "",
    duration_mins: "",
    buffer_mins: "",
    max_bookings_per_slot: 1,
    location_type: "vendor_location",
    is_remote: false,
    cancellation_window_hours: "",
    cancellation_fee_percent: "",
    tagsInput: "",
    status: "active",

    // Added for API requirements
    images: [],
    thumbnail: "",
    meta_title: "",
    meta_description: "",
};

// Whitelist of editable fields only. The GET-service response includes a
// bunch of read-only / joined columns (id, vendor_id, slug, created_at,
// currency_name, category_name, ...) that the update endpoint explicitly
// rejects ("<field> is not allowed"). Spreading the raw editingService
// object into form state — as this used to do — leaks all of those
// straight through to the submit payload. Only pull out what the form
// actually edits.
function toFormState(service) {
    return {
        name: service.name || "",
        short_description: service.short_description || "",
        description: service.description || "",
        category_id: service.category_id ?? "",
        subcategory_id: service.subcategory_id ?? "",
        currency_id: service.currency_id ?? "",
        base_price: service.base_price ?? "",
        compare_at_price: service.compare_at_price ?? "",
        duration_mins: service.duration_mins ?? "",
        buffer_mins: service.buffer_mins ?? "",
        max_bookings_per_slot: service.max_bookings_per_slot ?? 1,
        location_type: service.location_type || "vendor_location",
        is_remote: Boolean(service.is_remote),
        cancellation_window_hours: service.cancellation_window_hours ?? "",
        cancellation_fee_percent: service.cancellation_fee_percent ?? "",
        tagsInput: (service.tags || []).join(", "),
        // API requires string status
        status: service.status === "paused" ? "paused" : "active",
        images: Array.isArray(service.images) ? service.images : [],
        thumbnail: service.thumbnail ?? "",
        meta_title: service.meta_title ?? "",
        meta_description: service.meta_description ?? "",
    };
}

function usePickerData() {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        axiosInstance
            .get("/categories")
            .then((r) => setCategories(r.data?.result || []));

        axiosInstance
            .get("/subcategories")
            .then((r) => setSubcategories(r.data?.result || []));

        axiosInstance
            .get("/currencies")
            .then((r) => setCurrencies(r.data?.result || []));
    }, []);

    return { categories, subcategories, currencies };
}

// Only base64 data URLs are things the user actually picked in this session
// (FileReader.readAsDataURL always produces "data:image/...;base64,...").
// Anything else in form.thumbnail / form.images at this point is an existing
// stored URL that came back from the API, which the update endpoint won't
// accept as a resubmission.
const isNewUpload = (value) => typeof value === "string" && value.startsWith("data:");

export default function ServiceFormModal({
    open,
    onClose,
    onSaved,
    editingService,
}) {
    const { fg, border, main } = useColor();
    const { categories, subcategories, currencies } = usePickerData();

    const { createService, loading: creating } = useCreateService();
    const { updateService, loading: updating } = useUpdateService();

    const [form, setForm] = useState(DEFAULT_FORM);

    const patch = (p) => setForm((f) => ({ ...f, ...p }));

    const set = (key) => (e) =>
        patch({
            [key]: e.target.value,
        });

    const toggle = (key) => (e) =>
        patch({
            [key]: e.target.checked,
        });

    const isEditing = Boolean(editingService);
    const loading = creating || updating;

    useEffect(() => {
        if (!open) return;

        if (editingService) {
            setForm(toFormState(editingService));
        } else {
            setForm(DEFAULT_FORM);
        }
    }, [open, editingService]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files || []);

        if (!files.length) return;

        const readers = files.map(
            (file) =>
                new Promise((resolve, reject) => {
                    const reader = new FileReader();

                    reader.onload = () => resolve(reader.result);
                    reader.onerror = reject;

                    reader.readAsDataURL(file);
                })
        );

        Promise.all(readers)
            .then((images) => {
                patch({
                    images: [...form.images, ...images],
                });
            })
            .catch(() => {
                console.error("Failed to read selected images.");
            });

        e.target.value = "";
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            patch({
                thumbnail: reader.result,
            });
        };

        reader.onerror = () => {
            console.error("Failed to read thumbnail.");
        };

        reader.readAsDataURL(file);

        e.target.value = "";
    };

    const removeImage = (index) => {
        patch({
            images: form.images.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { tagsInput, images, thumbnail, ...rest } = form;

        const tags = tagsInput
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

        const maxBookings = Number(form.max_bookings_per_slot);

        const cancellationFee = Number(form.cancellation_fee_percent);

        if (!thumbnail) {
            return;
        }

        if (!maxBookings || maxBookings < 1) {
            return;
        }

        if (
            cancellationFee < 0 ||
            cancellationFee > 100 ||
            Number.isNaN(cancellationFee)
        ) {
            return;
        }

        const payload = {
            ...rest,

            category_id: Number(form.category_id),
            subcategory_id: form.subcategory_id
                ? Number(form.subcategory_id)
                : null,

            currency_id: Number(form.currency_id),

            base_price: Number(form.base_price),

            compare_at_price: form.compare_at_price
                ? Number(form.compare_at_price)
                : null,

            duration_mins: Number(form.duration_mins),

            buffer_mins: form.buffer_mins
                ? Number(form.buffer_mins)
                : 0,

            max_bookings_per_slot: maxBookings,

            cancellation_window_hours:
                form.cancellation_window_hours
                    ? Number(form.cancellation_window_hours)
                    : null,

            cancellation_fee_percent: cancellationFee,

            is_remote: Boolean(form.is_remote),

            status: form.status,

            tags,

            meta_title: form.meta_title,

            meta_description: form.meta_description,
        };

        // Only resubmit thumbnail/images when they're fresh base64 uploads.
        // On create these are always new. On edit, if the user didn't touch
        // them, they're still the pre-existing URLs from the API and must
        // be left out entirely — sending them back trips the "must be a
        // valid PNG/JPEG/WebP base64 data URL" validation, and there's no
        // reason to resend unchanged media anyway.
        if (!isEditing || isNewUpload(thumbnail)) {
            payload.thumbnail = thumbnail;
        }

        const newImages = images.filter(isNewUpload);
        if (!isEditing || newImages.length) {
            payload.images = isEditing ? newImages : images;
        }

        const result = isEditing
            ? await updateService(editingService.id, payload)
            : await createService(payload);

        if (result.success) {
            onSaved?.();
            onClose();
        }
    };

    const fieldSx = {
        border: `1px solid ${border.primary}`,
        borderRadius: radiusTokens.sm ?? 8,
        px: 1.4,
        py: 1,
        mt: 0.3,
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <Box component="form" onSubmit={handleSubmit}>
                <DialogTitle
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 16,
                            fontWeight: 800,
                            color: fg.primary,
                        }}
                    >
                        {isEditing ? "Edit Service" : "New Service"}
                    </Typography>

                    <IconButton onClick={onClose} size="small">
                        <Dismiss24Regular
                            style={{
                                fontSize: 18,
                                color: fg.secondary,
                            }}
                        />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Stack gap={1.8} sx={{ pt: 0.5 }}>
                        <Stack gap={0.6}>
                            <Typography
                                sx={{
                                    fontSize: 12.5,
                                    fontWeight: 700,
                                    color: fg.primary,
                                }}
                            >
                                Name
                            </Typography>

                            <Box sx={fieldSx}>
                                <InputBase
                                    fullWidth
                                    value={form.name}
                                    onChange={set("name")}
                                    placeholder="e.g. Home Cleaning"
                                    sx={{
                                        fontSize: 15,
                                        color: fg.primary,
                                    }}
                                />
                            </Box>
                        </Stack>

                        <Stack gap={0.6}>
                            <Typography
                                sx={{
                                    fontSize: 12.5,
                                    fontWeight: 700,
                                    color: fg.primary,
                                }}
                            >
                                Short description
                            </Typography>

                            <Box sx={fieldSx}>
                                <InputBase
                                    fullWidth
                                    value={form.short_description}
                                    onChange={set("short_description")}
                                    placeholder="One-line summary"
                                    sx={{
                                        fontSize: 14,
                                        color: fg.primary,
                                    }}
                                />
                            </Box>
                        </Stack>

                        <Stack gap={0.6}>
                            <Typography
                                sx={{
                                    fontSize: 12.5,
                                    fontWeight: 700,
                                    color: fg.primary,
                                }}
                            >
                                Description
                            </Typography>

                            <Box sx={fieldSx}>
                                <InputBase
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    value={form.description}
                                    onChange={set("description")}
                                    placeholder="Full details"
                                    sx={{
                                        fontSize: 14,
                                        color: fg.primary,
                                    }}
                                />
                            </Box>
                        </Stack>

                        <Stack direction="row" gap={1.2}>
                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    sx={{
                                        fontSize: 12.5,
                                        fontWeight: 700,
                                        color: fg.primary,
                                        mb: 0.6,
                                    }}
                                >
                                    Category
                                </Typography>

                                <Box sx={fieldSx}>
                                    <Select
                                        fullWidth
                                        variant="standard"
                                        disableUnderline
                                        displayEmpty
                                        value={form.category_id}
                                        onChange={set("category_id")}
                                        sx={{
                                            fontSize: 14,
                                            color: fg.primary,
                                        }}
                                    >
                                        <MenuItem value="" disabled>
                                            Select
                                        </MenuItem>

                                        {categories.map((c) => (
                                            <MenuItem
                                                key={c.id}
                                                value={c.id}
                                            >
                                                {c.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Box>
                            </Box>

                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    sx={{
                                        fontSize: 12.5,
                                        fontWeight: 700,
                                        color: fg.primary,
                                        mb: 0.6,
                                    }}
                                >
                                    Subcategory
                                </Typography>

                                <Box sx={fieldSx}>
                                    <Select
                                        fullWidth
                                        variant="standard"
                                        disableUnderline
                                        displayEmpty
                                        value={form.subcategory_id}
                                        onChange={set("subcategory_id")}
                                        sx={{
                                            fontSize: 14,
                                            color: fg.primary,
                                        }}
                                    >
                                        <MenuItem value="">
                                            None
                                        </MenuItem>

                                        {subcategories
                                            .filter(
                                                (s) =>
                                                    !form.category_id ||
                                                    s.category_id ===
                                                    form.category_id ||
                                                    Number(s.category_id) ===
                                                    Number(
                                                        form.category_id
                                                    )
                                            )
                                            .map((s) => (
                                                <MenuItem
                                                    key={s.id}
                                                    value={s.id}
                                                >
                                                    {s.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </Box>
                            </Box>
                        </Stack>

                        <Stack direction="row" gap={1.2}>
                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    sx={{
                                        fontSize: 12.5,
                                        fontWeight: 700,
                                        color: fg.primary,
                                        mb: 0.6,
                                    }}
                                >
                                    Currency
                                </Typography>

                                <Box sx={fieldSx}>
                                    <Select
                                        fullWidth
                                        variant="standard"
                                        disableUnderline
                                        displayEmpty
                                        value={form.currency_id}
                                        onChange={set("currency_id")}
                                        sx={{
                                            fontSize: 14,
                                            color: fg.primary,
                                        }}
                                    >
                                        <MenuItem value="" disabled>
                                            Select
                                        </MenuItem>

                                        {currencies.map((c) => (
                                            <MenuItem
                                                key={c.id}
                                                value={c.id}
                                            >
                                                {c.code}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Box>
                            </Box>

                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    sx={{
                                        fontSize: 12.5,
                                        fontWeight: 700,
                                        color: fg.primary,
                                        mb: 0.6,
                                    }}
                                >
                                    Base price
                                </Typography>

                                <Box sx={fieldSx}>
                                    <InputBase
                                        fullWidth
                                        type="number"
                                        value={form.base_price}
                                        onChange={set("base_price")}
                                        placeholder="0.00"
                                        inputProps={{ min: 0 }}
                                        sx={{
                                            fontSize: 14,
                                            color: fg.primary,
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    sx={{
                                        fontSize: 12.5,
                                        fontWeight: 700,
                                        color: fg.primary,
                                        mb: 0.6,
                                    }}
                                >
                                    Compare-at
                                </Typography>

                                <Box sx={fieldSx}>
                                    <InputBase
                                        fullWidth
                                        type="number"
                                        value={form.compare_at_price}
                                        onChange={set("compare_at_price")}
                                        placeholder="Optional"
                                        inputProps={{ min: 0 }}
                                        sx={{
                                            fontSize: 14,
                                            color: fg.primary,
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Stack>

                        <Stack direction="row" gap={1.2}>
                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    sx={{
                                        fontSize: 12.5,
                                        fontWeight: 700,
                                        color: fg.primary,
                                        mb: 0.6,
                                    }}
                                >
                                    Duration (mins)
                                </Typography>

                                <Box sx={fieldSx}>
                                    <InputBase
                                        fullWidth
                                        type="number"
                                        value={form.duration_mins}
                                        onChange={set("duration_mins")}
                                        placeholder="60"
                                        inputProps={{ min: 1 }}
                                        sx={{
                                            fontSize: 14,
                                            color: fg.primary,
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    sx={{
                                        fontSize: 12.5,
                                        fontWeight: 700,
                                        color: fg.primary,
                                        mb: 0.6,
                                    }}
                                >
                                    Buffer (mins)
                                </Typography>

                                <Box sx={fieldSx}>
                                    <InputBase
                                        fullWidth
                                        type="number"
                                        value={form.buffer_mins}
                                        onChange={set("buffer_mins")}
                                        placeholder="0"
                                        inputProps={{ min: 0 }}
                                        sx={{
                                            fontSize: 14,
                                            color: fg.primary,
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    sx={{
                                        fontSize: 12.5,
                                        fontWeight: 700,
                                        color: fg.primary,
                                        mb: 0.6,
                                    }}
                                >
                                    Max bookings/slot
                                </Typography>

                                <Box sx={fieldSx}>
                                    <InputBase
                                        fullWidth
                                        type="number"
                                        value={form.max_bookings_per_slot}
                                        onChange={set(
                                            "max_bookings_per_slot"
                                        )}
                                        placeholder="1"
                                        inputProps={{ min: 1 }}
                                        sx={{
                                            fontSize: 14,
                                            color: fg.primary,
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Stack>

                        <Stack gap={0.6}>
                            <Typography
                                sx={{
                                    fontSize: 12.5,
                                    fontWeight: 700,
                                    color: fg.primary,
                                }}
                            >
                                Location
                            </Typography>

                            <Box sx={fieldSx}>
                                <Select
                                    fullWidth
                                    variant="standard"
                                    disableUnderline
                                    value={form.location_type}
                                    onChange={set("location_type")}
                                    sx={{
                                        fontSize: 14,
                                        color: fg.primary,
                                    }}
                                >
                                    {LOCATION_TYPES.map((l) => (
                                        <MenuItem
                                            key={l.id}
                                            value={l.id}
                                        >
                                            {l.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>
                        </Stack>

                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Typography
                                sx={{
                                    fontSize: 13,
                                    fontWeight: 700,
                                    color: fg.primary,
                                }}
                            >
                                Available remotely
                            </Typography>

                            <Switch
                                checked={form.is_remote}
                                onChange={toggle("is_remote")}
                                sx={{
                                    "& .MuiSwitch-switchBase.Mui-checked": {
                                        color: main.primary,
                                    },
                                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                    {
                                        backgroundColor: main.primary,
                                    },
                                }}
                            />
                        </Stack>

                        <Stack direction="row" gap={1.2}>
                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    sx={{
                                        fontSize: 12.5,
                                        fontWeight: 700,
                                        color: fg.primary,
                                        mb: 0.6,
                                    }}
                                >
                                    Cancellation window (hrs)
                                </Typography>

                                <Box sx={fieldSx}>
                                    <InputBase
                                        fullWidth
                                        type="number"
                                        value={
                                            form.cancellation_window_hours
                                        }
                                        onChange={set(
                                            "cancellation_window_hours"
                                        )}
                                        placeholder="Optional"
                                        inputProps={{ min: 0 }}
                                        sx={{
                                            fontSize: 14,
                                            color: fg.primary,
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    sx={{
                                        fontSize: 12.5,
                                        fontWeight: 700,
                                        color: fg.primary,
                                        mb: 0.6,
                                    }}
                                >
                                    Cancellation fee %
                                </Typography>

                                <Box sx={fieldSx}>
                                    <InputBase
                                        fullWidth
                                        type="number"
                                        value={
                                            form.cancellation_fee_percent
                                        }
                                        onChange={set(
                                            "cancellation_fee_percent"
                                        )}
                                        placeholder="Optional"
                                        inputProps={{
                                            min: 0,
                                            max: 100,
                                        }}
                                        sx={{
                                            fontSize: 14,
                                            color: fg.primary,
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Stack>

                        <Stack gap={0.6}>
                            <Typography
                                sx={{
                                    fontSize: 12.5,
                                    fontWeight: 700,
                                    color: fg.primary,
                                }}
                            >
                                Tags
                            </Typography>

                            <Box sx={fieldSx}>
                                <InputBase
                                    fullWidth
                                    value={form.tagsInput}
                                    onChange={set("tagsInput")}
                                    placeholder="Comma-separated"
                                    sx={{
                                        fontSize: 14,
                                        color: fg.primary,
                                    }}
                                />
                            </Box>
                        </Stack>

                        {/* Added: Status */}
                        <Stack gap={0.6}>
                            <Typography
                                sx={{
                                    fontSize: 12.5,
                                    fontWeight: 700,
                                    color: fg.primary,
                                }}
                            >
                                Status
                            </Typography>

                            <Box sx={fieldSx}>
                                <Select
                                    fullWidth
                                    variant="standard"
                                    disableUnderline
                                    value={form.status}
                                    onChange={set("status")}
                                    sx={{
                                        fontSize: 14,
                                        color: fg.primary,
                                    }}
                                >
                                    <MenuItem value="active">
                                        Active
                                    </MenuItem>

                                    <MenuItem value="paused">
                                        Paused
                                    </MenuItem>
                                </Select>
                            </Box>
                        </Stack>

                        {/* Added: Thumbnail */}
                        <Stack gap={0.6}>
                            <Typography
                                sx={{
                                    fontSize: 12.5,
                                    fontWeight: 700,
                                    color: fg.primary,
                                }}
                            >
                                Thumbnail *
                            </Typography>

                            <Box sx={fieldSx}>
                                <Button
                                    component="label"
                                    variant="outlined"
                                    sx={{
                                        textTransform: "none",
                                        borderColor: border.primary,
                                        color: fg.primary,
                                    }}
                                >
                                    {form.thumbnail
                                        ? "Change thumbnail"
                                        : "Choose thumbnail"}

                                    <input
                                        hidden
                                        type="file"
                                        accept="image/*"
                                        onChange={handleThumbnailChange}
                                    />
                                </Button>

                                {form.thumbnail && (
                                    <Box
                                        component="img"
                                        src={form.thumbnail}
                                        alt="Thumbnail preview"
                                        sx={{
                                            display: "block",
                                            width: 80,
                                            height: 80,
                                            objectFit: "cover",
                                            borderRadius:
                                                radiusTokens.sm ?? 8,
                                            mt: 1,
                                        }}
                                    />
                                )}
                            </Box>
                        </Stack>

                        {/* Added: Images */}
                        <Stack gap={0.6}>
                            <Typography
                                sx={{
                                    fontSize: 12.5,
                                    fontWeight: 700,
                                    color: fg.primary,
                                }}
                            >
                                Images
                            </Typography>

                            <Box sx={fieldSx}>
                                <Button
                                    component="label"
                                    variant="outlined"
                                    sx={{
                                        textTransform: "none",
                                        borderColor: border.primary,
                                        color: fg.primary,
                                    }}
                                >
                                    Add images

                                    <input
                                        hidden
                                        multiple
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </Button>

                                {form.images.length > 0 && (
                                    <Stack
                                        direction="row"
                                        gap={1}
                                        flexWrap="wrap"
                                        sx={{ mt: 1.2 }}
                                    >
                                        {form.images.map((image, index) => (
                                            <Box
                                                key={`${image}-${index}`}
                                                sx={{
                                                    position: "relative",
                                                }}
                                            >
                                                <Box
                                                    component="img"
                                                    src={image}
                                                    alt={`Service image ${index + 1
                                                        }`}
                                                    sx={{
                                                        width: 70,
                                                        height: 70,
                                                        objectFit: "cover",
                                                        borderRadius:
                                                            radiusTokens.sm ??
                                                            8,
                                                    }}
                                                />

                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        removeImage(index)
                                                    }
                                                    sx={{
                                                        position: "absolute",
                                                        top: -8,
                                                        right: -8,
                                                        width: 22,
                                                        height: 22,
                                                        backgroundColor:
                                                            "white",
                                                        boxShadow:
                                                            "0 1px 4px rgba(0,0,0,0.2)",
                                                    }}
                                                >
                                                    <Dismiss24Regular
                                                        style={{
                                                            fontSize: 13,
                                                        }}
                                                    />
                                                </IconButton>
                                            </Box>
                                        ))}
                                    </Stack>
                                )}
                            </Box>
                        </Stack>

                        {/* Added: SEO fields */}
                        <Stack gap={0.6}>
                            <Typography
                                sx={{
                                    fontSize: 12.5,
                                    fontWeight: 700,
                                    color: fg.primary,
                                }}
                            >
                                Meta title
                            </Typography>

                            <Box sx={fieldSx}>
                                <InputBase
                                    fullWidth
                                    value={form.meta_title}
                                    onChange={set("meta_title")}
                                    placeholder="SEO title"
                                    sx={{
                                        fontSize: 14,
                                        color: fg.primary,
                                    }}
                                />
                            </Box>
                        </Stack>

                        <Stack gap={0.6}>
                            <Typography
                                sx={{
                                    fontSize: 12.5,
                                    fontWeight: 700,
                                    color: fg.primary,
                                }}
                            >
                                Meta description
                            </Typography>

                            <Box sx={fieldSx}>
                                <InputBase
                                    fullWidth
                                    multiline
                                    minRows={2}
                                    value={form.meta_description}
                                    onChange={set("meta_description")}
                                    placeholder="SEO description"
                                    sx={{
                                        fontSize: 14,
                                        color: fg.primary,
                                    }}
                                />
                            </Box>
                        </Stack>
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2.5 }}>
                    <Button
                        onClick={onClose}
                        sx={{
                            textTransform: "none",
                            color: fg.secondary,
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={
                            loading ||
                            !form.name.trim() ||
                            !form.base_price ||
                            !form.category_id ||
                            !form.currency_id ||
                            !form.thumbnail ||
                            Number(form.max_bookings_per_slot) < 1 ||
                            Number(form.cancellation_fee_percent) > 100
                        }
                        sx={{
                            backgroundColor: main.primary,
                            textTransform: "none",
                            fontWeight: 700,
                            borderRadius: radiusTokens.md,
                            px: 2.4,
                        }}
                    >
                        {loading
                            ? "Saving..."
                            : isEditing
                                ? "Save changes"
                                : "Create service"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}