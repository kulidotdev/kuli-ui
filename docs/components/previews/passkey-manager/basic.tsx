'use client';

import { useState } from 'react';
import { PasskeyManager } from '@kuli-ui/components/components/auth/passkey-manager';

export function PasskeyManagerBasic() {
  const [passkeys, setPasskeys] = useState<Array<{
    id: string;
    name?: string;
    createdAt: Date;
    lastUsedAt?: Date;
    deviceType?: string;
  }>>([
    {
      id: '1',
      name: 'Macbook Touch ID',
      createdAt: new Date(),
      lastUsedAt: new Date(),
      deviceType: 'mac',
    }
  ]);

  const handleAdd = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPasskeys([...passkeys, {
      id: Math.random().toString(),
      name: 'New Passkey',
      createdAt: new Date(),
      deviceType: 'unknown',
    }]);
  };

  const handleRemove = async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPasskeys(passkeys.filter(pk => pk.id !== id));
  };

  return (
    <PasskeyManager
      passkeys={passkeys}
      onAddPasskey={handleAdd}
      onRemovePasskey={handleRemove}
    >
      <PasskeyManager.Header>
        <PasskeyManager.Title>Passkeys</PasskeyManager.Title>
        <PasskeyManager.Description>
          Sign in securely without a password using biometrics or a security key.
        </PasskeyManager.Description>
      </PasskeyManager.Header>
      
      <PasskeyManager.EmptyState />
      
      <PasskeyManager.List>
        {passkeys.map((pk) => (
          <PasskeyManager.Item key={pk.id} passkey={pk}>
            <PasskeyManager.ItemDetails />
            <PasskeyManager.ItemActions />
          </PasskeyManager.Item>
        ))}
      </PasskeyManager.List>
      
      <PasskeyManager.AddAction />
    </PasskeyManager>
  );
}
