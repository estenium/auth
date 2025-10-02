'use client';

import Postmate from 'postmate';
import { useEffect, useRef, useState } from 'react';

import { SocialProvider, Credentials } from '@/core/types';
import { Config, ParentMethods } from '@/core/types/postmate';
import { GoogleSignInForm } from '@/core/features/google/components/GoogleSignInForm';

const MainClient = () => {
  const [socialProvider, setAuthProvider] = useState<SocialProvider>();
  const parentRef = useRef<ParentMethods | null>(null);
  const configRef = useRef<Config | null>(null);

  const handleAuthFormSubmit = (credentials: Credentials) => {
    if (!parentRef.current) return;
    parentRef.current.emit('onLogin', credentials);
  };

  // Handshake, init config
  useEffect(() => {
    const handshake = new Postmate.Model({
      setConfig: (config: Config) => {
        // console.log('[Postmate child]: Received config from parent');
        configRef.current = config;
        if (config.socialProvider !== socialProvider) {
          setAuthProvider(config.socialProvider);
        }
      },
    });

    handshake
      .then((parent) => {
        parentRef.current = parent;
        console.log('[Postmate child]: Connected to parent');
        parent.emit('ready');
      })
      .catch((err) => {
        console.error('[Postmate child]: Handshake failed:', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <GoogleSignInForm onSubmit={handleAuthFormSubmit} />;
};

export default MainClient;
