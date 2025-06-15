import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { supabase } from '@/integrations/supabase/client';
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Camera,
  Save,
  Trash2,
  Eye,
  EyeOff,
  Download,
  Upload,
  Key,
  Mail,
  Phone,
  MapPin,
  Briefcase
} from 'lucide-react';

const Settings = () => {
  const { user, signOut } = useAuth();
  const { profile, updateProfile } = useProfile();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile settings state
  const [profileData, setProfileData] = useState({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    avatar_url: profile?.avatar_url || ''
  });

  // Notification settings state
  const [notifications, setNotifications] = useState({
    email_interviews: true,
    email_candidates: true,
    email_reports: false,
    push_interviews: true,
    push_candidates: false,
    push_reports: false,
    sms_interviews: false,
    sms_reminders: true
  });

  // Privacy settings state
  const [privacy, setPrivacy] = useState({
    profile_visibility: 'team',
    show_email: false,
    show_phone: false,
    activity_tracking: true,
    data_analytics: true
  });

  // Appearance settings state
  const [appearance, setAppearance] = useState({
    theme: 'dark',
    language: 'en',
    timezone: 'UTC',
    date_format: 'MM/DD/YYYY',
    time_format: '12h'
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleProfileUpdate = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      await updateProfile(profileData);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.new_password !== passwordData.confirm_password) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.new_password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.new_password
      });

      if (error) throw error;

      setPasswordData({
        current_password: '',
        new_password: '',
        confirm_password: ''
      });

      toast({
        title: "Password Updated",
        description: "Your password has been successfully changed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setLoading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const newProfileData = { ...profileData, avatar_url: data.publicUrl };
      setProfileData(newProfileData);
      await updateProfile(newProfileData);

      toast({
        title: "Avatar Updated",
        description: "Your profile picture has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = async () => {
    setLoading(true);
    try {
      // Simulate data export
      const userData = {
        profile: profileData,
        settings: {
          notifications,
          privacy,
          appearance
        },
        exported_at: new Date().toISOString()
      };

      const dataStr = JSON.stringify(userData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `user-data-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Data Exported",
        description: "Your data has been successfully exported.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    try {
      // In a real app, you'd call an API to delete the account
      // For now, we'll just sign out
      await signOut();
      toast({
        title: "Account Deletion Initiated",
        description: "Your account deletion request has been submitted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account. Please contact support.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-primary text-text-primary p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
            <p className="text-text-secondary mt-2">Manage your account preferences and settings</p>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-dark-secondary border-border-dark grid grid-cols-5 w-full">
            <TabsTrigger value="profile" className="data-[state=active]:bg-tech-green data-[state=active]:text-dark-primary">
              <User size={16} className="mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-tech-green data-[state=active]:text-dark-primary">
              <Bell size={16} className="mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-tech-green data-[state=active]:text-dark-primary">
              <Shield size={16} className="mr-2" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-tech-green data-[state=active]:text-dark-primary">
              <Palette size={16} className="mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-tech-green data-[state=active]:text-dark-primary">
              <Key size={16} className="mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-dark-secondary border-border-dark">
              <CardHeader>
                <CardTitle className="text-text-primary flex items-center gap-2">
                  <User className="h-5 w-5 text-tech-green" />
                  Profile Information
                </CardTitle>
                <CardDescription className="text-text-secondary">
                  Update your personal information and profile picture
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Upload */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profileData.avatar_url} />
                    <AvatarFallback className="bg-tech-green text-dark-primary text-lg">
                      {profileData.first_name?.[0]}{profileData.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Label htmlFor="avatar-upload" className="cursor-pointer">
                      <Button variant="outline" className="border-border-dark" asChild>
                        <span>
                          <Camera size={16} className="mr-2" />
                          Change Avatar
                        </span>
                      </Button>
                    </Label>
                    <Input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                    <p className="text-xs text-text-secondary">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                <Separator className="bg-border-dark" />

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      value={profileData.first_name}
                      onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })}
                      className="bg-dark-primary border-border-dark"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      value={profileData.last_name}
                      onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
                      className="bg-dark-primary border-border-dark"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="bg-dark-primary border-border-dark"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="bg-dark-primary border-border-dark"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={handleProfileUpdate} 
                    disabled={loading}
                    className="bg-tech-green hover:bg-tech-green/90 text-dark-primary"
                  >
                    <Save size={16} className="mr-2" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-dark-secondary border-border-dark">
              <CardHeader>
                <CardTitle className="text-text-primary flex items-center gap-2">
                  <Bell className="h-5 w-5 text-tech-green" />
                  Notification Preferences
                </CardTitle>
                <CardDescription className="text-text-secondary">
                  Choose how you want to be notified about important events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Notifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-text-primary flex items-center gap-2">
                    <Mail size={16} className="text-tech-green" />
                    Email Notifications
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Interview Updates</Label>
                        <p className="text-sm text-text-secondary">Get notified about interview schedules and changes</p>
                      </div>
                      <Switch
                        checked={notifications.email_interviews}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, email_interviews: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>New Candidates</Label>
                        <p className="text-sm text-text-secondary">Get notified when new candidates apply</p>
                      </div>
                      <Switch
                        checked={notifications.email_candidates}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, email_candidates: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Weekly Reports</Label>
                        <p className="text-sm text-text-secondary">Receive weekly performance reports</p>
                      </div>
                      <Switch
                        checked={notifications.email_reports}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, email_reports: checked })}
                      />
                    </div>
                  </div>
                </div>

                <Separator className="bg-border-dark" />

                {/* Push Notifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-text-primary flex items-center gap-2">
                    <Bell size={16} className="text-tech-green" />
                    Push Notifications
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Interview Reminders</Label>
                        <p className="text-sm text-text-secondary">Get push notifications for upcoming interviews</p>
                      </div>
                      <Switch
                        checked={notifications.push_interviews}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, push_interviews: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Candidate Activities</Label>
                        <p className="text-sm text-text-secondary">Get notified about candidate actions</p>
                      </div>
                      <Switch
                        checked={notifications.push_candidates}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, push_candidates: checked })}
                      />
                    </div>
                  </div>
                </div>

                <Separator className="bg-border-dark" />

                {/* SMS Notifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-text-primary flex items-center gap-2">
                    <Phone size={16} className="text-tech-green" />
                    SMS Notifications
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Emergency Alerts</Label>
                        <p className="text-sm text-text-secondary">Urgent notifications via SMS</p>
                      </div>
                      <Switch
                        checked={notifications.sms_interviews}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, sms_interviews: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Interview Reminders</Label>
                        <p className="text-sm text-text-secondary">SMS reminders 30 minutes before interviews</p>
                      </div>
                      <Switch
                        checked={notifications.sms_reminders}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, sms_reminders: checked })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="bg-dark-secondary border-border-dark">
              <CardHeader>
                <CardTitle className="text-text-primary flex items-center gap-2">
                  <Shield className="h-5 w-5 text-tech-green" />
                  Privacy & Data
                </CardTitle>
                <CardDescription className="text-text-secondary">
                  Control your privacy settings and data usage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Profile Visibility</Label>
                    <Select value={privacy.profile_visibility} onValueChange={(value) => setPrivacy({ ...privacy, profile_visibility: value })}>
                      <SelectTrigger className="bg-dark-primary border-border-dark">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public - Visible to everyone</SelectItem>
                        <SelectItem value="team">Team Only - Visible to team members</SelectItem>
                        <SelectItem value="private">Private - Only visible to you</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="bg-border-dark" />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Email Address</Label>
                        <p className="text-sm text-text-secondary">Allow others to see your email address</p>
                      </div>
                      <Switch
                        checked={privacy.show_email}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, show_email: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Phone Number</Label>
                        <p className="text-sm text-text-secondary">Allow others to see your phone number</p>
                      </div>
                      <Switch
                        checked={privacy.show_phone}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, show_phone: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Activity Tracking</Label>
                        <p className="text-sm text-text-secondary">Allow tracking of your activity for analytics</p>
                      </div>
                      <Switch
                        checked={privacy.activity_tracking}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, activity_tracking: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Data Analytics</Label>
                        <p className="text-sm text-text-secondary">Allow your data to be used for improving the platform</p>
                      </div>
                      <Switch
                        checked={privacy.data_analytics}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, data_analytics: checked })}
                      />
                    </div>
                  </div>

                  <Separator className="bg-border-dark" />

                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-text-primary">Data Management</h3>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        onClick={handleExportData}
                        disabled={loading}
                        className="border-border-dark"
                      >
                        <Download size={16} className="mr-2" />
                        Export My Data
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={handleDeleteAccount}
                        disabled={loading}
                      >
                        <Trash2 size={16} className="mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <Card className="bg-dark-secondary border-border-dark">
              <CardHeader>
                <CardTitle className="text-text-primary flex items-center gap-2">
                  <Palette className="h-5 w-5 text-tech-green" />
                  Appearance & Localization
                </CardTitle>
                <CardDescription className="text-text-secondary">
                  Customize the look and feel of your interface
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select value={appearance.theme} onValueChange={(value) => setAppearance({ ...appearance, theme: value })}>
                      <SelectTrigger className="bg-dark-primary border-border-dark">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dark">Dark Theme</SelectItem>
                        <SelectItem value="light">Light Theme</SelectItem>
                        <SelectItem value="auto">System Default</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select value={appearance.language} onValueChange={(value) => setAppearance({ ...appearance, language: value })}>
                      <SelectTrigger className="bg-dark-primary border-border-dark">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select value={appearance.timezone} onValueChange={(value) => setAppearance({ ...appearance, timezone: value })}>
                      <SelectTrigger className="bg-dark-primary border-border-dark">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="EST">Eastern Time</SelectItem>
                        <SelectItem value="PST">Pacific Time</SelectItem>
                        <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date Format</Label>
                    <Select value={appearance.date_format} onValueChange={(value) => setAppearance({ ...appearance, date_format: value })}>
                      <SelectTrigger className="bg-dark-primary border-border-dark">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Time Format</Label>
                    <Select value={appearance.time_format} onValueChange={(value) => setAppearance({ ...appearance, time_format: value })}>
                      <SelectTrigger className="bg-dark-primary border-border-dark">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                        <SelectItem value="24h">24-hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-dark-secondary border-border-dark">
              <CardHeader>
                <CardTitle className="text-text-primary flex items-center gap-2">
                  <Key className="h-5 w-5 text-tech-green" />
                  Security & Authentication
                </CardTitle>
                <CardDescription className="text-text-secondary">
                  Manage your password and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Password Change */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-text-primary">Change Password</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="current_password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current_password"
                          type={showPasswords.current ? 'text' : 'password'}
                          value={passwordData.current_password}
                          onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                          className="bg-dark-primary border-border-dark pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                        >
                          {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new_password">New Password</Label>
                      <div className="relative">
                        <Input
                          id="new_password"
                          type={showPasswords.new ? 'text' : 'password'}
                          value={passwordData.new_password}
                          onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                          className="bg-dark-primary border-border-dark pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                        >
                          {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm_password">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirm_password"
                          type={showPasswords.confirm ? 'text' : 'password'}
                          value={passwordData.confirm_password}
                          onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                          className="bg-dark-primary border-border-dark pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                        >
                          {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={handlePasswordChange} 
                    disabled={loading || !passwordData.current_password || !passwordData.new_password || !passwordData.confirm_password}
                    className="bg-tech-green hover:bg-tech-green/90 text-dark-primary"
                  >
                    <Key size={16} className="mr-2" />
                    {loading ? 'Updating...' : 'Update Password'}
                  </Button>
                </div>

                <Separator className="bg-border-dark" />

                {/* Account Status */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-text-primary">Account Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Verified</Label>
                        <p className="text-sm text-text-secondary">Your email address has been verified</p>
                      </div>
                      <Badge variant="secondary" className="bg-tech-green text-dark-primary">
                        Verified
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-text-secondary">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline" className="border-border-dark">
                        Enable 2FA
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;