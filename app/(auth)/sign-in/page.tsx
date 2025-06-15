import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import CredentialsSignInForm from './credentials-signin-form';

export const metadata: Metadata = {
  title: 'Sign In',
};

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      {' '}
      {/* 垂直+水平居中 */}
      <div className="w-full max-w-md">
        {' '}
        {/* 限制宽度 */}
        <Card className="w-full">
          {' '}
          {/* Card 宽度填满父容器 */}
          <CardHeader className="space-y-4">
            <Link href="/" className="flex justify-center">
              {' '}
              {/* Logo 居中 */}
              <Image
                src="/images/logo.svg"
                width={100}
                height={100}
                alt={`${APP_NAME} logo`}
                priority={true}
              />
            </Link>
            <CardTitle className="text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account to continue
            </CardDescription>
            <CardContent className="space-y-4">
              <CredentialsSignInForm />
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
