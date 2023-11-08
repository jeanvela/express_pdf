import bcrypt from 'bcrypt'

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

export async function comparePassword(password: string, userpassword: string | undefined): Promise<boolean> {
    if (userpassword === undefined) return false
    return await bcrypt.compare(password, userpassword)
}