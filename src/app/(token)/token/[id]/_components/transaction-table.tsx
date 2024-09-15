'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { Token } from '@/types';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useLazyQuery,
  gql
} from '@apollo/client';
import { cn, formatAddress, timeAgo } from '@/lib/utils';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { TableSkeleton } from '@/components/table-skeleton';
import Link from 'next/link';
import { formatEther } from 'viem';

const GET_ALL_TOKEN_SWAPS = gql`
  query GetAllTokenSwaps($tokenAddress: String!) {
    tokenSwaps(filter: { token: { equalTo: $tokenAddress } }, orderBy: TIMESTAMP_DESC) {
      nodes {
        id
        token
        txnType
        amount
        fee
        timestamp
        user
      }
    }
  }
`;
export default function TransactionTable({ token }: { token: Token }) {
  const [getTokenSwaps, { loading, error, data }] = useLazyQuery(GET_ALL_TOKEN_SWAPS);

  useEffect(() => {
    if (token) {
      getTokenSwaps({ variables: { tokenAddress: token?.contract_address } });
    }
    console.log(data?.tokenSwaps?.nodes, 'Transaction');
  }, [token, getTokenSwaps, data]);

  return (
    <ScrollArea className="h-[70vh] w-full py-10">
      {loading ? (
        <TableSkeleton
          columnCount={5}
          rowCount={10}
          withPagination={false}
          showViewOptions={false}
          shrinkZero={true}
        />
      ) : (
        <div className="w-full overflow-hidden py-[10]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Txns</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>To</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data?.tokenSwaps?.nodes.length >= 1 ? (
                data?.tokenSwaps?.nodes.map((transaction: any) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      <Link
                        href={`https://scan-testnet.assetchain.org/tx/${transaction.id}`}
                        target="__blank"
                      >
                        {formatAddress(transaction.id)}
                      </Link>
                    </TableCell>
                    <TableCell
                      className={cn(
                        transaction.txnType === 'BUY' ? 'text-green-700' : 'text-destructive'
                      )}
                    >
                      {transaction.txnType}
                    </TableCell>
                    <TableCell>{formatEther(transaction.amount)}</TableCell>
                    <TableCell>{formatAddress(transaction.user)}</TableCell>
                    <TableCell className="text-right">
                      {timeAgo(transaction.timestamp)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No transactions found for this token
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </ScrollArea>
  );
}
