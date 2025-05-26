import { getRewardsDescription } from '@/loan/components/PageLlamaMarkets/cells/MarketTitleCell/cell.utils'
import { FavoriteMarketButton } from '@/loan/components/PageLlamaMarkets/FavoriteMarketButton'
import { LlamaMarket, LlamaMarketType } from '@/loan/entities/llama-markets'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { t } from '@ui-kit/lib/i18n'
import { RewardIcons } from '@ui-kit/shared/ui/RewardIcon'
import { Tooltip } from '@ui-kit/shared/ui/Tooltip'
import { SizesAndSpaces } from '@ui-kit/themes/design/1_sizes_spaces'

const { Spacing } = SizesAndSpaces

const poolTypeNames: Record<LlamaMarketType, () => string> = {
  [LlamaMarketType.Lend]: () => t`Lend`,
  [LlamaMarketType.Mint]: () => t`Mint`,
}

const poolTypeTooltips: Record<LlamaMarketType, () => string> = {
  [LlamaMarketType.Lend]: () => t`Lend markets allow you to earn interest on your assets.`,
  [LlamaMarketType.Mint]: () => t`Mint markets allow you to borrow assets against your collateral.`,
}

/** Displays badges for a pool, such as the chain icon and the pool type. */
export const MarketBadges = ({ market: { address, rewards, type, leverage } }: { market: LlamaMarket }) => {
  const isMobile = useMediaQuery((t) => t.breakpoints.down('tablet'))
  const isSmall = useMediaQuery('(max-width:1250px)')
  return (
    <Stack direction="row" gap={Spacing.sm} alignItems="center">
      <Tooltip title={poolTypeTooltips[type]()}>
        <Chip
          size="small"
          color="default"
          label={poolTypeNames[type]()}
          data-testid={`pool-type-${type.toLowerCase()}`}
        />
      </Tooltip>

      {leverage > 0 && (
        <Tooltip title={t`How much you can leverage your position`}>
          {isMobile ? (
            <Typography>🔥</Typography>
          ) : (
            <Chip
              size="small"
              color="highlight"
              label={t`🔥 ${leverage.toPrecision(2)}x ${isSmall ? '' : t`leverage`}`}
            />
          )}
        </Tooltip>
      )}

      {rewards.length > 0 && (
        <Tooltip
          title={rewards.map((r, i) => (
            <Box key={i}>{getRewardsDescription(r)}</Box>
          ))}
          placement="top"
        >
          <RewardIcons data-testid="rewards-badge" size="md" rewards={rewards} />
        </Tooltip>
      )}

      <FavoriteMarketButton address={address} desktopOnly />
    </Stack>
  )
}
