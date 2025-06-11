import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { LoaderCircle } from "lucide-react";

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      const data = response.data;
      localStorage.setItem('accessToken', data.accessToken);
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className={cn("flex flex-col gap-6 items-center min-h-screen justify-center px-4", className)} {...props}>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-blue-600 text-center">Login as Admin</CardTitle>
            <CardDescription>
              Enter your admin credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSubmit();
                }}
            >
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      disabled={loading}
                      placeholder="Enter Your email"
                      required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      disabled={loading}
                      placeholder="Enter Your password"
                      required
                  />
                </div>

                {errorMessage && (
                    <div className="text-red-600 text-sm font-medium">
                      {errorMessage}
                    </div>
                )}

                <div className="flex flex-col gap-3">
                  <Button
                      type="submit"
                      className="w-full"
                      disabled={loading}
                  >
                    {loading && <LoaderCircle className="animate-spin mr-2" />}
                    Login
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
  );
}
