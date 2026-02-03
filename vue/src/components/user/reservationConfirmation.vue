<script>
export default {
  name: 'ReservationConfirmation',
}
</script>

<script setup>
defineProps({
  reservation: {
    type: Object,
    default: () => ({
      boat: {
        name: 'F30RD',
        owner: 'Mohamed',
        surname: 'Rubio Rigo',
        eslora: '15m',
        manga: '4m',
        calado: '1.5m',
        embarcationType: 'Motor',
        registration: '7-PM-2-164-23'
      },
      dates: {
        arrival: '12/06/2026',
        departure: '16/06/2026',
        arrivalTime: '17:00',
        nights: 4
      },
      contact: {
        phone: '681 41 56 66',
        dni: '44656788L',
        email: 'pedromarin@nautik.com'
      },
      payment: {
        subtotal: '624.80€',
        iva: '131.20€',
        total: '756.00€',
        method: 'Tarjeta'
      },
      reservationNumber: 'r25rb21w16f200gamr26',
      marina: {
        name: 'Marina de Cala d\'Or',
        port: 'Marina Cala D\'Or',
        channel: 'VHF: 9',
        location: 'Ubicación puerto: 39° 22.5\' N, 3° 9.9\' E'
      }
    })
  }
})
</script>

<template>
  <div class="max-w-5xl mx-auto px-6 py-8">

    <button class="text-blue-600 text-sm font-medium mb-6 hover:underline flex items-center gap-1">
      <span>&lt;</span>
      <span>Volver</span>
    </button>


    <div class="bg-principal-blue text-white rounded-xl px-8 py-6 mb-4">
      <h1 class="text-2xl font-bold">Reserva</h1>
    </div>


    <div class="bg-green-500 text-white rounded-xl px-8 py-5 mb-6 text-center">
      <p class="text-lg font-bold uppercase">RESERVA REALIZADA CON ÉXITO!! DISFRUTA TU ESTANCIA.</p>
    </div>

    <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
      <div class="grid grid-cols-3 gap-x-12 gap-y-6">

        <div class="space-y-4">
          <div>
            <p class="text-xs text-gray-500 mb-1">Barco:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.boat.name }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">Nombre:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.boat.owner }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">Apellidos:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.boat.surname }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">Llegada:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.dates.arrival }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">Salida:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.dates.departure }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">Hora de llegada:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.dates.arrivalTime }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">Noches:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.dates.nights }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">Subtotal sin IVA:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.payment.subtotal }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">IVA:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.payment.iva }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">Precio total:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.payment.total }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">Método de pago seleccionado:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.payment.method }}</p>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <p class="text-xs text-gray-500 mb-1">Nombre del barco:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.boat.name }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">Eslora:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.boat.eslora }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">Manga:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.boat.manga }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">Calado:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.boat.calado }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">Tipo de embarcación:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.boat.embarcationType }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">Matrícula:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.boat.registration }}</p>
          </div>

          <div class="pt-8">
            <p class="text-xs text-gray-500 mb-1">Puerto:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.marina.port }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">Canal VHF:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.marina.channel }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">{{ reservation.marina.location }}</p>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <p class="text-xs text-gray-500 mb-1">Teléfono de contacto:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.contact.phone }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">DNI/Pasaporte:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.contact.dni }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-1">Email:</p>
            <p class="text-sm font-semibold text-gray-900">{{ reservation.contact.email }}</p>
          </div>

          <div class="pt-8">
            <p class="text-sm italic text-gray-700 mb-2">Número de reserva:</p>
            <p class="text-xl font-bold text-gray-900 break-all">{{ reservation.reservationNumber }}</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-6 mt-6 text-center border border-gray-200">
            <p class="text-lg font-bold text-[#0a1e3d] mb-1">{{ reservation.marina.name }}</p>
            <p class="text-xs text-gray-600 uppercase tracking-wide">PUERTO DEPORTIVO</p>
          </div>


          <div class="pt-4">
            <button class="w-full bg-[#0a1e3d] text-white rounded-lg px-6 py-3 font-semibold text-sm hover:bg-principal-blue transition-colors">
              Descargar compobante
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>