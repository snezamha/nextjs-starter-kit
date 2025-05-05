import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">
          نمونه کامپوننت‌های shadcn با پشتیبانی RTL
        </h1>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">حساب کاربری</TabsTrigger>
            <TabsTrigger value="password">رمز عبور</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>حساب کاربری</CardTitle>
                <CardDescription>اطلاعات حساب کاربری خود را در اینجا تغییر دهید.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">نام</Label>
                  <Input id="name" defaultValue="علی محمدی" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">نام کاربری</Label>
                  <Input id="username" defaultValue="@alimohammadi" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>ذخیره تغییرات</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>رمز عبور</CardTitle>
                <CardDescription>رمز عبور خود را در اینجا تغییر دهید.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">رمز عبور فعلی</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">رمز عبور جدید</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>تغییر رمز عبور</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
