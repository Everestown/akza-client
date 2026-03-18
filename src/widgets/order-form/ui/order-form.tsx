import { useRef, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { gsap } from '@/shared/lib/gsap'
import { useOrderForm, type OrderFormValues } from '../model/use-order-form'
import { useSubmitOrder } from '@/features/submit-order/model/use-submit-order'
import { useStore } from '@/app/stores/store.context'
import { Dialog, DialogContent, DialogTitle } from '@/shared/ui/dialog'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'

export const OrderForm = observer(function OrderForm() {
  const { orderForm } = useStore()
  const { mutate, isPending } = useSubmitOrder()
  const formRef = useRef<HTMLFormElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useOrderForm()

  useEffect(() => {
    if (!orderForm.isOpen) return
    reset()
    const ctx = gsap.context(() => {
      gsap.fromTo('.order-field',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.4, ease: 'power2.out', delay: 0.15 }
      )
    }, formRef)
    return () => ctx.revert()
  }, [orderForm.isOpen, reset])

  function onSubmit(values: OrderFormValues) {
    if (!orderForm.variantId) return
    mutate({ ...values, variant_id: orderForm.variantId })
  }

  return (
    <Dialog open={orderForm.isOpen} onOpenChange={() => orderForm.close()}>
      <DialogContent>
        <DialogTitle>Оставить заявку</DialogTitle>

        {orderForm.variantSlug && (
          <p className="section-tag mb-6 -mt-4">
            Арт. <span className="font-mono">{orderForm.variantSlug}</span>
          </p>
        )}

        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="order-field">
            <Input
              label="Имя *"
              placeholder="Айша"
              error={errors.customer_name?.message}
              {...register('customer_name')}
            />
          </div>

          <div className="order-field">
            <Input
              label="Telegram *"
              placeholder="@username"
              error={errors.telegram_username?.message}
              {...register('telegram_username')}
            />
          </div>

          <div className="order-field">
            <Input
              label="Телефон"
              placeholder="+7 928 …"
              type="tel"
              {...register('phone')}
            />
          </div>

          <div className="order-field flex flex-col gap-1">
            <label className="section-tag mb-1">Комментарий</label>
            <textarea
              placeholder="Размер, пожелания..."
              maxLength={150}
              className="input-base resize-none min-h-[72px]"
              {...register('comment')}
            />
            {errors.comment && (
              <p className="text-[11px] text-red-hot mt-1">{errors.comment.message}</p>
            )}
          </div>

          <div className="order-field flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => orderForm.close()}
              className="section-tag hover:text-mist transition-colors"
            >
              Отмена
            </button>
            <Button type="submit" loading={isPending}>
              Отправить заявку
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
})
