'use client';

import Image from 'next/image';
import { LoaderCircle, Star } from 'lucide-react';
import { AspectRatio } from '../ui/aspect-ratio';
import { PlaceholderImage } from '../placeholder-image';
import Link from 'next/link';
import { formatAddress, truncate } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { STATE_STATUS } from '@/types';
import { deleteFavoriteToken, favoriteToken } from '@/lib/actions/token';
import { toast } from 'sonner';
import { Progress } from '../ui/progress';

type TokenCardProps = {
  unique_id: string;
  name: string;
  symbol: string;
  image: string;
  owner?: string;
  market_cap: number;
  user?: object;
  creator_unique_id?: string;
};

export default function OwnedTokenCard({ ...token }: TokenCardProps) {
  const router = useRouter();
  const [status, setStatus] = useState(STATE_STATUS.IDLE);

  async function addToFavorite() {
    setStatus(STATE_STATUS.LOADING);
    try {
      const result = await favoriteToken(token.unique_id);
      if (result.code !== 200) {
        setStatus(STATE_STATUS.ERROR);
        toast.error('An error ocurred');
        router.refresh();
        return;
      }

      setStatus(STATE_STATUS.SUCCESS);
      toast.error('Added to favorites');
      router.refresh();
      return;
    } catch (error) {
      setStatus(STATE_STATUS.ERROR);
      toast.error('An error ocurred');
      router.refresh();
      return;
    }
  }
  async function removeFromFavorite() {
    setStatus(STATE_STATUS.LOADING);
    try {
      const result = await deleteFavoriteToken(token.unique_id);
      if (result.code !== 200) {
        setStatus(STATE_STATUS.ERROR);
        toast.error('An error ocurred');
        router.refresh();
        return;
      }

      setStatus(STATE_STATUS.SUCCESS);
      toast.error('Removed');
      router.refresh();
      return;
    } catch (error) {
      setStatus(STATE_STATUS.ERROR);
      toast.error('An error ocurred');
      router.refresh();
      return;
    }
  }

  return (
    <div className="flex w-full min-w-full flex-col items-start gap-4 rounded-lg border border-card-foreground bg-card p-2 lg:min-w-[240px] lg:p-4">
      <AspectRatio ratio={2 / 1.5}>
        {token.image ? (
          <Image
            src={token.image ?? '/images/token-placeholder.webp'}
            alt={`${token.name}-${token.symbol}`}
            className="rounded-lg bg-no-repeat object-cover object-center"
            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
            fill
            loading="lazy"
          />
        ) : (
          <PlaceholderImage className="rounded-none" asChild />
        )}
      </AspectRatio>
      {/* <Image
        src={token.image}
        alt={token.name}
        width={208}
        height={134}
       
        className="h-[134px] min-w-[134px] rounded-lg bg-cover bg-no-repeat lg:min-w-[208px]"
        priority
      /> */}
      <div className="flex h-full w-full items-center justify-between">
        <div className="flex h-full flex-col gap-1">
          <dt className="text-ellipsis font-bold">
            <Link href={`/token/${token.unique_id}`}>{truncate(token.name, 14)}</Link>

            {/* {token.name} */}
          </dt>
          <dd className="text-sm font-light text-muted">
            Created by{' '}
            <Link
              href={`/profile/${token.creator_unique_id}`}
              className="text-primary underline-offset-4 hover:underline"
            >
              {token.owner ?? 'view'}
            </Link>
          </dd>
        </div>
        <span className="flex items-center justify-center rounded bg-primary px-1 py-[2px] text-[0.5rem] text-white lg:text-[0.875rem]">
          ${token.symbol}
        </span>
      </div>
      <Progress value={60} />
      <span className="text-[0.875rem]/[0.00875rem] font-light">
        Market cap: <span className="text-[#6100FF]">{token.market_cap}</span>
      </span>
    </div>
  );
}
