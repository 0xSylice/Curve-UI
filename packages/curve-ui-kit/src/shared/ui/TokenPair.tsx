import Box from '@mui/material/Box'
import { Tooltip } from '@ui-kit/shared/ui/Tooltip'
import { SizesAndSpaces } from '@ui-kit/themes/design/1_sizes_spaces'
import { ChainIcon } from '../icons/ChainIcon'
import { Token } from './Token'

const { IconSize } = SizesAndSpaces

type Asset = {
  symbol: string
  address: string
}

type Props = {
  chain: string
  assets: {
    borrowed: Asset
    collateral: Asset
  }
}

export const TokenPair = ({ chain, assets: { borrowed, collateral } }: Props) => (
  <Box sx={{ position: 'relative', width: IconSize.xxl, height: IconSize.xxl }}>
    <Token
      blockchainId={chain}
      address={borrowed.address}
      tooltip={borrowed.symbol}
      sx={{ position: 'absolute', top: '30%', left: '30%' }}
    />

    <Token
      blockchainId={chain}
      address={collateral.address}
      tooltip={collateral.symbol}
      sx={{ position: 'absolute', bottom: '30%', right: '30%' }}
    />

    <Tooltip title={chain} placement="top">
      <Box sx={{ position: 'absolute', top: '0%', left: '0%' }}>
        <ChainIcon size="xs" blockchainId={chain} />
      </Box>
    </Tooltip>
  </Box>
)
