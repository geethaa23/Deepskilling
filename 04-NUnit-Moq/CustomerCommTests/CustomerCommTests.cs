using CustomerCommLib;
using Moq;
using NUnit.Framework;

namespace CustomerCommTests
{
    [TestFixture]
    public class CustomerCommTests
    {
        private Mock<IMailSender> mockMailSender;
        private CustomerComm customerComm;

        [SetUp]
        public void Setup()
        {
            mockMailSender = new Mock<IMailSender>();

            mockMailSender
                .Setup(x => x.SendMail(It.IsAny<string>(), It.IsAny<string>()))
                .Returns(true);

            customerComm = new CustomerComm(mockMailSender.Object);
        }

        [Test]
        public void SendMail_ShouldReturnTrue()
        {
            bool result = customerComm.SendMailToCustomer();

            Assert.That(result, Is.True);
        }
    }
}