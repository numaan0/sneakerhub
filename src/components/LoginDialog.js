import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { checkUsernameAvailability } from '../api';
const LoginDialog = ({ open, onClose, isLogin, setIsLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [userType, setUserType] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [usernameError, setUsernameError] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate
  const { handleLogin, handleSignup, error, user } = useAuth();

  useEffect(() => {
    const checkUsername = async () => {
      if (username.trim() && !isLogin) {
        try {
          const response = await checkUsernameAvailability(username);
          setIsUsernameAvailable(response.data);
          setUsernameError(response.data ? '' : 'Username is already taken');
        } catch (error) {
          toast.error('Error checking username availability');
        }
      }
    };
    checkUsername();
  }, [username, isLogin]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await handleLogin(username, password);
      } else {
        if (isUsernameAvailable) {
          await handleSignup(username, password, email, dob, profilePic, userType, mobileNumber);
        } else {
          toast.error('Please choose a different username');
        }
      }

      if (!error) {
        toast.success(isLogin ? 'Login successful!' : 'Signup successful!');
        onClose();
        const user = JSON.parse(localStorage.getItem('user'));

        if (user?.user_type === 'seller') {
          navigate('/seller-dashboard'); // Redirect to seller dashboard
        }else if(user?.user_type =='admin'){
          navigate('/admin-dashboard');
        }
      } else {
        toast.error(error);
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setUsername('');
    setPassword('');
    setEmail('');
    setDob('');
    setProfilePic('');
    setUserType('');
    setMobileNumber('');
    setIsUsernameAvailable(true);
    setUsernameError('');
    onClose();
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
        <DialogTitle>
          <Typography variant="h5" component="div" gutterBottom>
            {isLogin ? 'Login' : 'Sign Up'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              autoFocus
              label="Username"
              type="text"
              fullWidth
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              error={!!usernameError}
              helperText={usernameError}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {!isLogin && (
              <>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <TextField
                  label="Date of Birth"
                  type="date"
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
                <TextField
                  label="Mobile Number"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                />
                <FormControl fullWidth variant="outlined" required>
                  <InputLabel>User Type</InputLabel>
                  <Select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    label="User Type"
                  >
                    <MenuItem value="customer">Customer</MenuItem>
                    <MenuItem value="seller">Seller</MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar src={profilePic} sx={{ width: 56, height: 56 }} />
                  <Button variant="contained" component="label">
                    Upload Profile Picture
                    <input type="file" hidden accept="image/*" onChange={handleProfilePicChange} />
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </DialogActions>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <Button variant="text" color="primary" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Login'}
            </Button>
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );
};

export default LoginDialog;
