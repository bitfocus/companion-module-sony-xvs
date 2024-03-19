import { xvsInstance } from '../main.js'
import { AUXXPTEffectAddresses, SOURCES } from '../constants.js'

export function INCOMING_AUX_XPT(self: xvsInstance, buffer: Buffer): boolean {
	if (buffer.readUint8(0) !== 4) {
		return false
	}

	if (!AUXXPTEffectAddresses.map((obj) => obj.address).includes(buffer.readUint8(1))) {
		return false
	}

	if (buffer.readUint8(2) !== 0xc0) {
		return false
	}

	const data1 = buffer.readUInt8(3)
	const data2 = buffer.readUInt8(4)

	const found = AUXXPTEffectAddresses.find((obj) => obj.address === buffer.readUInt8(1))

	if (!found) {
		return false
	}

	const foundSource = SOURCES[self.config.model].find((obj) => obj.byte1 === data1 && obj.byte2 === data2)

	if (!foundSource) {
		console.log('AUXXPT: (NO SOURCE MATCH)', { data1, data2, found, foundSource })
		return false
	}

	// TODO: Handle feedbacks for AUX XPT
	console.log('INCOMING: AUXXPT:', found, foundSource)

	return true
}
