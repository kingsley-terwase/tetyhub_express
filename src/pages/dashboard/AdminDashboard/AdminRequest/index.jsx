// @ts-nocheck
import { useState } from "react";
import { useSearchParams, Link as RouterLink } from "react-router-dom";
import {
    Container,
    Paper,
    Stack,
    Box,
    Typography,
    TextField,
    Button,
    Alert,
    Link,
    CircularProgress,
} from "@mui/material";
import { useAcceptInvitation } from "../../../../Hooks/admins";

export default function AdminRequestPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") ?? "";

    const { acceptInvitation, loading } = useAcceptInvitation();

    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [localError, setLocalError] = useState("");
    const [result, setResult] = useState(null);

    const missingToken = !token;

    function validate() {
        if (password.length < 8) {
            return "Password must be at least 8 characters.";
        }
        if (password !== passwordConfirmation) {
            return "Passwords don't match.";
        }
        return null;
    }

    /**
     * @param {{ preventDefault: () => void; }} e
     */
    async function handleSubmit(e) { 
        e.preventDefault();
        const validationError = validate();
        if (validationError) {
            setLocalError(validationError);
            return;
        }
        setLocalError("");

        const { success, result } = await acceptInvitation({
            token,
            password,
            password_confirmation: passwordConfirmation,
        });

        if (success) {
            setResult(result);
        }
    }

    return (
        <Container maxWidth="xs" sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
            <Paper variant="outlined" sx={{ p: 4, width: "100%" }}>
                <Box sx={{ width: 32, height: 32, borderRadius: 1, bgcolor: "primary.main", mb: 2.5 }} />

                <Typography variant="h6" fontWeight={600} gutterBottom>
                    Set up your admin account
                </Typography>

                {missingToken && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        This link is missing its invitation token. Check the link in your email and try again.
                    </Alert>
                )}

                {!missingToken && result && (
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <Typography fontWeight={600}>Invitation accepted.</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {result.firstname}, your account ({result.email}) is active. You can sign in now.
                        </Typography>
                        <Button component={RouterLink} to="/login" variant="contained" fullWidth>
                            Go to sign in
                        </Button>
                    </Stack>
                )}

                {!missingToken && !result && (
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Choose a password to activate your admin account.
                        </Typography>

                        <Stack spacing={2}>
                            <TextField
                                label="Password"
                                type="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                fullWidth
                                required
                            />
                            <TextField
                                label="Confirm password"
                                type="password"
                                autoComplete="new-password"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                disabled={loading}
                                fullWidth
                                required
                            />

                            {localError && <Alert severity="error">{localError}</Alert>}

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={16} /> : null}
                            >
                                {loading ? "Activating…" : "Activate account"}
                            </Button>
                        </Stack>
                    </Box>
                )}

                {!missingToken && !result && (
                    <Typography variant="body2" sx={{ mt: 3 }} color="text.secondary">
                        Already activated? <Link component={RouterLink} to="/login">Sign in</Link>
                    </Typography>
                )}
            </Paper>
        </Container>
    );
}