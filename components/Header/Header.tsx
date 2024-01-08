import { Center, Container, Flex, Group, Menu, Title } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import Link from 'next/link';
import classes from './Header.module.css';
import { MetaplexLogo, MetaplexLogoVariant } from '../MetaplexLogo';
import { Env } from '@/providers/useEnv';
import { InscriptionCounter } from '../InscriptionCounter/inscriptionCounter';

const HeaderLink = ({ label, link, disabled }: { label: string, link: string, disabled?: boolean }) => {
  const cls = disabled ? [classes.disabled, classes.link].join(' ') : classes.link;
  return (
    <Link href={link} className={cls}>
      {label}
    </Link>
  );
};

export function Header({ env, setEnv }: { env: string; setEnv: (env: Env) => void }) {
  return (
    <Container
      size="lg"
      h={80}
      pt={12}
    >
      <div className={classes.inner}>
        <Flex justify="center" align="center" gap="md">
          <Link href="/">
            <MetaplexLogo variant={MetaplexLogoVariant.Small} />
          </Link>
          <Title order={2}>Inscriptions</Title>
        </Flex>
        <Group>
          <InscriptionCounter />
          <HeaderLink label="Inscribe" link="/inscribe" />
          <HeaderLink label="Manage" link="/manage" disabled />
          <WalletMultiButton />
          <Menu trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
            <Menu.Target>
              <a
                href={undefined}
                className={classes.link}
                onClick={(event) => event.preventDefault()}
              >
                <Center>
                  <span className={classes.linkLabel}>{env}</span>
                  <IconChevronDown size="0.9rem" stroke={1.5} />
                </Center>
              </a>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item disabled onClick={() => setEnv('mainnet-beta')}>Mainnet Beta</Menu.Item>
              <Menu.Item onClick={() => setEnv('devnet')}>Devnet</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </div>
    </Container>
  );
}
