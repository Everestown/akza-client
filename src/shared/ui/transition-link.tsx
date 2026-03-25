/**
 * TransitionLink — drop-in replacement for React Router <Link>.
 *
 * On click, briefly animates the page wrapper out (220ms),
 * then navigates. This removes any "flash" between routes.
 *
 * Usage: import TransitionLink from '@/shared/ui/transition-link'
 * Then use exactly like <Link to="...">
 */
import { forwardRef } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { useNavigateWithTransition } from '@/shared/lib/use-navigate-transition'

type Props = Omit<LinkProps, 'to'> & { to: string }

const TransitionLink = forwardRef<HTMLAnchorElement, Props>(
  function TransitionLink({ to, onClick, children, ...rest }, ref) {
    const navigate = useNavigateWithTransition()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Only intercept left clicks without modifiers
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return
      e.preventDefault()
      onClick?.(e)
      navigate(to)
    }

    return (
      <Link ref={ref} to={to} onClick={handleClick} {...rest}>
        {children}
      </Link>
    )
  }
)

export default TransitionLink
