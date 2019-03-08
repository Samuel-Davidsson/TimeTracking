using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace Domain.Services
{
    public class Crypt
    {
        readonly string PasswordHash = "523g98uP";

        readonly string SaltKey = "SoLTgtEY";

        readonly string VIKey = "n1B2c3D4e5F6g7H8";

        readonly string uniqueKey = "Sam rules";

        public string Encrypt(string plainText)
        {
            byte[] plainTextBytes = Encoding.UTF8.GetBytes(plainText);

            byte[] keyBytes = new Rfc2898DeriveBytes(PasswordHash, Encoding.ASCII.GetBytes(SaltKey)).GetBytes(256 / 8);

            var symmetricKey = new RijndaelManaged() { Mode = CipherMode.CBC, Padding = PaddingMode.Zeros };

            var encryptor = symmetricKey.CreateEncryptor(keyBytes, Encoding.ASCII.GetBytes(VIKey));

            byte[] cipherTextBytes;

            using (var memoryStream = new MemoryStream())
            {

                using (var cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
                {

                    cryptoStream.Write(plainTextBytes, 0, plainTextBytes.Length);

                    cryptoStream.FlushFinalBlock();

                    cipherTextBytes = memoryStream.ToArray();

                    cryptoStream.Close();
                }
                memoryStream.Close();
            }
            return Convert.ToBase64String(cipherTextBytes);
        }

        public string Decrypt(string encryptedText)
        {

            byte[] cipherTextBytes = Convert.FromBase64String(encryptedText);

            byte[] keyBytes = new Rfc2898DeriveBytes(PasswordHash, Encoding.ASCII.GetBytes(SaltKey)).GetBytes(256 / 8);

            var symmetricKey = new RijndaelManaged() { Mode = CipherMode.CBC, Padding = PaddingMode.None };



            var decryptor = symmetricKey.CreateDecryptor(keyBytes, Encoding.ASCII.GetBytes(VIKey));

            var memoryStream = new MemoryStream(cipherTextBytes);

            var cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read);

            byte[] plainTextBytes = new byte[cipherTextBytes.Length];



            int decryptedByteCount = cryptoStream.Read(plainTextBytes, 0, plainTextBytes.Length);

            memoryStream.Close();

            cryptoStream.Close();

            return Encoding.UTF8.GetString(plainTextBytes, 0, decryptedByteCount).TrimEnd("\0".ToCharArray());

        }

        public string GenerateUniqueKey()
        {

            Random random = new Random();

            string number = string.Format("{0} {1}", uniqueKey, random.Next(0, 4567));

            string crypted = Encrypt(number);

            return crypted;

        }
        public bool ValidKey(string crypted)
        {

            bool valid = false;

            if (Decrypt(crypted).Contains(uniqueKey))

                valid = true;

            return valid;
        }

    }
}
