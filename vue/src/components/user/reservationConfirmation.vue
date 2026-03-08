<script>
export default {
  name: 'ReservationConfirmation',
}
</script>

<script setup>
defineProps({
  reservation: {
    type: Object,
  },
})
</script>

<template>
  <div class="max-w-5xl mx-auto px-6 py-8">
    <button class="text-blue-600 text-sm font-medium mb-6 hover:underline flex items-center gap-1">
      <span>&lt;</span>
      <span>{{ $t('reservations.confirmation.back') }}</span>
    </button>

    <div class="bg-principal-blue text-white rounded-xl px-8 py-6 mb-4">
      <h1 class="text-2xl font-bold">{{ $t('reservations.confirmation.title') }}</h1>
    </div>

    <div class="bg-green-500 text-white rounded-xl px-8 py-5 mb-6 text-center">
      <p class="text-lg font-bold uppercase">{{ $t('reservations.confirmation.successBanner') }}</p>
    </div>

    <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
      <div class="grid grid-cols-3 gap-x-12 gap-y-6">
        <div class="space-y-4">
          <div>
            <p class="text-xs text-gray-500 mb-1">{{ $t('reservations.confirmation.boat') }}:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.boat.name }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">
              {{ $t('reservations.confirmation.ownerName') }}:
            </p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.boat.owner }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">
              {{ $t('reservations.confirmation.lastName') }}:
            </p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.boat.surname }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">{{ $t('reservations.confirmation.arrival') }}:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.dates.arrival }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">
              {{ $t('reservations.confirmation.departure') }}:
            </p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.dates.departure }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">
              {{ $t('reservations.confirmation.arrivalTime') }}:
            </p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.dates.arrivalTime }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">{{ $t('reservations.confirmation.nights') }}:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.dates.nights }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">
              {{ $t('reservations.confirmation.subtotal') }}:
            </p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.payment.subtotal }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">{{ $t('reservations.confirmation.vat') }}:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.payment.iva }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">
              {{ $t('reservations.confirmation.totalPrice') }}:
            </p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.payment.total }}</p>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <p class="text-xs text-gray-500 mb-1">
              {{ $t('reservations.confirmation.boatName') }}:
            </p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.boat.name }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">{{ $t('boats.tabelHeaders.draft') }}:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.boat.eslora }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">{{ $t('landing.search.beamLabel') }}:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.boat.manga }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">{{ $t('landing.search.lengthLabel') }}:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.boat.calado }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">
              {{ $t('reservations.confirmation.boatType') }}:
            </p>
            <p class="text-sm font-semibold text-gray-900">
              {{ reservation.boat.embarcationType }}
            </p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">
              {{ $t('reservations.confirmation.registry') }}:
            </p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.boat.registration }}</p>
          </div>

          <div class="pt-8">
            <p class="text-xs text-gray-500 mb-1">{{ $t('reservations.confirmation.port') }}:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.marina.port }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">
              {{ $t('reservations.confirmation.vhfChannel') }}:
            </p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.marina.channel }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">{{ reservation.marina.location }}</p>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <p class="text-xs text-gray-500 mb-1">
              {{ $t('reservations.confirmation.contactPhone') }}:
            </p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.contact.phone }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">
              {{ $t('reservations.confirmation.dniPassport') }}:
            </p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.contact.dni }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">{{ $t('reservations.confirmation.email') }}:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.contact.email }}</p>
          </div>

          <div class="pt-8">
            <p class="text-sm italic text-gray-700 mb-2">
              {{ $t('reservations.confirmation.reservationNumber') }}:
            </p>
            <p class="text-xl font-bold text-gray-900 break-all">
              {{ reservation.reservationNumber }}
            </p>
          </div>

          <div class="bg-gray-50 rounded-lg p-6 mt-6 text-center border border-gray-200">
            <p class="text-lg font-bold text-[#0a1e3d] mb-1">{{ reservation.marina.name }}</p>
            <p class="text-xs text-gray-600 uppercase tracking-wide">
              {{ $t('reservations.confirmation.sportsMarina') }}
            </p>
          </div>

          <div class="pt-4">
            <button
              class="w-full bg-[#0a1e3d] text-white rounded-lg px-6 py-3 font-semibold text-sm hover:bg-principal-blue transition-colors"
            >
              {{ $t('reservations.confirmation.downloadVoucher') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>